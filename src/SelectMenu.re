type item = Model.item;

type state = {
  inputValue: string,
  filteredItems: array(item),
  focusedItemIndex: int,
};

type action = 
| ChangeInputValue(string)
| FilterItems(string)
| FocusNextItem
| FocusPrevItem
| SelectItem;

[@react.component]

let make = (
    ~items: array(item),
    ~selectedItem: option(item),
    ~onSelect: item => unit=(_) => (),
  ) => {

  let initialState = {
    inputValue: "" ,
    filteredItems: items,
    focusedItemIndex: 0,
  };

  let reducer = (state, action) => {
    let { focusedItemIndex, filteredItems } = state;
    switch (action) {
    | ChangeInputValue(inputValue) => { ...state, inputValue } 
    | FilterItems(inputValue) => 
      let filteredItems: array(item) = 
        items -> Belt.Array.keep(item => {
          inputValue == "" || Js.String.includes(inputValue, Js.String.toLowerCase(item.label))
        });
      { ...state, filteredItems, focusedItemIndex: 0 }
    | FocusNextItem when focusedItemIndex < Js.Array.length(filteredItems) - 1 =>
      { ...state, focusedItemIndex: focusedItemIndex + 1 }
    | FocusPrevItem when focusedItemIndex > 0 =>
      { ...state, focusedItemIndex: focusedItemIndex - 1 }
    | SelectItem =>
      let focusedItem = filteredItems[focusedItemIndex];
      onSelect(focusedItem);
      state;
    | _ => state
    };
  }

  let (state, dispatch) = React.useReducer(reducer, initialState);

  let { inputValue, filteredItems, focusedItemIndex } = state;

  <div>
    <input
      value=inputValue
      onChange=(
        event => {
          let value: string = ReactEvent.Form.target(event)##value;
          dispatch(ChangeInputValue(value));
          dispatch(FilterItems(value));
        }
      )
      onKeyDown={
        event => {
          let key: int = ReactEvent.Keyboard.which(event);
          let preventDefault = ReactEvent.Keyboard.preventDefault;
          switch (key) {
          | 40 => 
            preventDefault(event)
            dispatch(FocusNextItem)
          | 38 => 
            preventDefault(event)
            dispatch(FocusPrevItem)
          | 13 =>
            preventDefault(event)
            dispatch(SelectItem)
          | _ => ()
          }
        }
      }
    />
    <ul>
      {
        filteredItems
        -> Belt.Array.mapWithIndex((i, item) => {
            let style={ReactDOMRe.Style.make(
              ~backgroundColor= i == focusedItemIndex ? "red" : Some(filteredItems[i]) == selectedItem ? "blue" : "white",
              (),
            )};
            <li key={item.value} style=style>{ React.string(item.label) }</li>
          })
        -> React.array
      }
    </ul>
  </div>

};
