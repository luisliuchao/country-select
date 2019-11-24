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
| SelectItem(item);


module Styles = SelectMenuStyles;

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
          inputValue == "" || Js.String.includes(Js.String.toLowerCase(inputValue), Js.String.toLowerCase(item.label))
        });
      { ...state, filteredItems, focusedItemIndex: 0 }
    | FocusNextItem when focusedItemIndex < Js.Array.length(filteredItems) - 1 =>
      { ...state, focusedItemIndex: focusedItemIndex + 1 }
    | FocusPrevItem when focusedItemIndex > 0 =>
      { ...state, focusedItemIndex: focusedItemIndex - 1 }
    | SelectItem(item) =>
      onSelect(item);
      state;
    | _ => state
    };
  }

  let (state, dispatch) = React.useReducer(reducer, initialState);

  let { inputValue, filteredItems, focusedItemIndex } = state;

  <div className=Styles.container>
    <input
      placeholder="Search"
      value=inputValue
      className=Styles.input
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
            let item: item = filteredItems[focusedItemIndex]
            dispatch(SelectItem(item))
          | _ => ()
          }
        }
      }
    />
    <ul 
      className=Styles.list
      onClick={
        event => {
          let label: string  = ReactEvent.Mouse.target(event)##innerText;
          let items = filteredItems -> Belt.Array.keep(item => {
            item.label == label
          });
          switch (Js.Array.length(items)) {
          | 0 => ()
          | _ => 
            dispatch(SelectItem(items[0]));
          }
        }
      }
    >
      {
        filteredItems
        -> Belt.Array.mapWithIndex((i, item) => {
            let focus: bool = i == focusedItemIndex;
            let active: bool = Some(filteredItems[i]) == selectedItem;
            <li key={item.value} className=Styles.listItem(focus, active)>
              { React.string(item.label) }
            </li>
          })
        -> React.array
      }
    </ul>
  </div>

};
