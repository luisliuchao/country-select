open Webapi.Dom;

type item = Model.item;

type state = {
  inputValue: string,
  filteredItems: array(item),
  focusedItemIndex: int,
};

type action = 
| ChangeInputValue(string)
| FilterItems(string)
| FocusItem(int)
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

  let ( isScrollingMenu, setIsScrolling ) = React.useState(() => false);

  let initialState = {
    inputValue: "" ,
    filteredItems: items,
    focusedItemIndex: 0,
  };

  let scrollMenu = (~distance) => {
    let containerEle = Utils.getElementById("CountrySelect-list-container");
    switch (containerEle) {
    | None => ()
    | Some(container) => {
        HtmlElement.setScrollTop(container, distance)
        // fix the issue of cursor hovering on other item when navigating using keyboard
        setIsScrolling(_ => true);
        let _id = Js.Global.setTimeout(() => setIsScrolling(_ => false), 100);
      }
    }
  };

  let checkMenuScroll= (~index) => {
    let containerEle = Utils.getElementById("CountrySelect-list-container");
    switch (containerEle) {
    | None => ()
    | Some(container) =>
        let containerHeight: float = float_of_int(HtmlElement.clientHeight(container))
        let containerScrollTop: float = HtmlElement.scrollTop(container)
        let itemEle = Utils.getElementById("CountrySelect-list-item-" ++ string_of_int(index))
        switch(itemEle) {
        | None => ()
        | Some(item) => 
          let itemHeight: float = float_of_int(HtmlElement.clientHeight(item))
          let itemOffsetTop :float = float_of_int(HtmlElement.offsetTop(item))
          let bottomDiff: float = (containerScrollTop +. containerHeight) -. (itemHeight +. itemOffsetTop);
          if (bottomDiff < 0.0) {
            scrollMenu(~distance=(-1.0 *. bottomDiff) +. containerScrollTop);
          } else  {
            let topDiff: float = itemOffsetTop -. containerScrollTop;
            if (topDiff < 0.0) {
              scrollMenu(~distance=topDiff +. containerScrollTop);
            }
          }
        }
    }
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
    | FocusItem(index) =>
      { ...state, focusedItemIndex: index }
    | FocusNextItem when focusedItemIndex < Belt.Array.length(filteredItems) - 1 =>
      let newIndex: int = focusedItemIndex + 1;
      checkMenuScroll(~index=newIndex);
      { ...state, focusedItemIndex: newIndex }
    | FocusPrevItem when focusedItemIndex > 0 =>
      let newIndex: int = focusedItemIndex - 1;
      checkMenuScroll(~index=newIndex);
      { ...state, focusedItemIndex: newIndex }
    | SelectItem(item) =>
      onSelect(item);
      state;
    | _ => state
    };
  }

  let (state, dispatch) = React.useReducer(reducer, initialState);

  let { inputValue, filteredItems, focusedItemIndex } = state;

  React.useEffect0(() => {
    // focus the input 
    let inputEle = Utils.getElementById("CountrySelect-filter")
    switch (inputEle) {
    | None => ()
    | Some(element) => HtmlElement.focus(element)
    }

    // scroll to the current country
    switch (selectedItem) {
    | None => ();
    | Some(item) => {
        let index = filteredItems |> Js.Array.indexOf(item);
        if (index > -1) {
          dispatch(FocusItem(index));
          let scrollToIndex = index + 4;
          let itemsLength = Belt.Array.length(filteredItems);
          if (scrollToIndex > itemsLength - 1) {
            checkMenuScroll(~index=itemsLength - 1);
          } else {
            checkMenuScroll(~index=scrollToIndex);
          }
        }
      }
    }

    None;
  });

  <div className=Styles.container>
    <input
      id="CountrySelect-filter"
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
      onKeyDown=(
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
            if (Belt.Array.length(filteredItems) > focusedItemIndex) {
              let item: item = filteredItems[focusedItemIndex]
              dispatch(SelectItem(item))
            }
          | _ => ()
          }
        }
      )
    />
    <ul 
      id="CountrySelect-list-container"
      className=Styles.listContainer
      onClick=(
        event => {
          let label: string = ReactEvent.Mouse.target(event)##innerText;
          let item = filteredItems -> Belt.Array.getBy(item => {
            item.label == label
          });
          switch (item) {
          | None => ()
          | Some(item) => dispatch(SelectItem(item))
          }
        }
      )
    >
      {
        filteredItems
        -> Belt.Array.mapWithIndex((i, item) => {
            let focus: bool = i == focusedItemIndex;
            let active: bool = Some(filteredItems[i]) == selectedItem;
            <li 
              id={"CountrySelect-list-item-" ++ string_of_int(i)}
              key={item.value} 
              className=Styles.listItem(~focus=focus, ~active=active)
              onMouseEnter=(_ => {
                if (!isScrollingMenu) {
                  dispatch(FocusItem(i))
                }
              })
            >
              <span className={"flag-icon flag-icon-" ++ item.value ++ " " ++ Styles.itemMap}></span>
              <span className=Styles.itemLabel>
                { React.string(item.label) }
              </span>

            </li>
          })
        -> React.array
      }
    </ul>
  </div>

};
