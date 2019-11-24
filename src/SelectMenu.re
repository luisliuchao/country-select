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
| FocusPrevItem;

[@react.component]

let make = (
    ~items: array(item),
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
    | _ => state
    };
  }

  let (state, dispatch) = React.useReducer(reducer, initialState);

  <div>
    <input
      value=state.inputValue
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
          switch (key) {
          | 40 => 
            ReactEvent.Keyboard.preventDefault(event)
            dispatch(FocusNextItem)
          | 38 => 
            ReactEvent.Keyboard.preventDefault(event)
            dispatch(FocusPrevItem)
          | _ => ()
          }
        }
      }
    />
    <ul>
      {
        state.filteredItems
        -> Belt.Array.mapWithIndex((i, item) => {
            let style={ReactDOMRe.Style.make(
              ~backgroundColor= i === state.focusedItemIndex ? "red" : "blue",
              (),
            )};
            <li key={item.value} style=style>{ React.string(item.label) }</li>
          })
        -> React.array
      }
    </ul>
  </div>

};
