'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");

function SelectMenu(Props) {
  var items = Props.items;
  var match = Props.onSelect;
  var onSelect = match !== undefined ? match : (function (param) {
        return /* () */0;
      });
  var initialState = /* record */[
    /* inputValue */"",
    /* filteredItems */items,
    /* focusedItemIndex */0
  ];
  var reducer = function (state, action) {
    var focusedItemIndex = state[/* focusedItemIndex */2];
    var filteredItems = state[/* filteredItems */1];
    if (typeof action === "number") {
      switch (action) {
        case /* FocusNextItem */0 :
            if (focusedItemIndex < (filteredItems.length - 1 | 0)) {
              return /* record */[
                      /* inputValue */state[/* inputValue */0],
                      /* filteredItems */state[/* filteredItems */1],
                      /* focusedItemIndex */focusedItemIndex + 1 | 0
                    ];
            } else {
              return state;
            }
        case /* FocusPrevItem */1 :
            if (focusedItemIndex > 0) {
              return /* record */[
                      /* inputValue */state[/* inputValue */0],
                      /* filteredItems */state[/* filteredItems */1],
                      /* focusedItemIndex */focusedItemIndex - 1 | 0
                    ];
            } else {
              return state;
            }
        case /* SelectItem */2 :
            var focusedItem = Caml_array.caml_array_get(filteredItems, focusedItemIndex);
            Curry._1(onSelect, focusedItem);
            return state;
        
      }
    } else if (action.tag) {
      var inputValue = action[0];
      var filteredItems$1 = Belt_Array.keep(items, (function (item) {
              if (inputValue === "") {
                return true;
              } else {
                return item[/* label */0].toLowerCase().includes(inputValue);
              }
            }));
      return /* record */[
              /* inputValue */state[/* inputValue */0],
              /* filteredItems */filteredItems$1,
              /* focusedItemIndex */0
            ];
    } else {
      return /* record */[
              /* inputValue */action[0],
              /* filteredItems */state[/* filteredItems */1],
              /* focusedItemIndex */state[/* focusedItemIndex */2]
            ];
    }
  };
  var match$1 = React.useReducer(reducer, initialState);
  var dispatch = match$1[1];
  var state = match$1[0];
  return React.createElement("div", undefined, React.createElement("input", {
                  value: state[/* inputValue */0],
                  onKeyDown: (function ($$event) {
                      var key = $$event.which;
                      if (key >= 38) {
                        if (key >= 41) {
                          return /* () */0;
                        } else {
                          switch (key - 38 | 0) {
                            case 0 :
                                $$event.preventDefault();
                                return Curry._1(dispatch, /* FocusPrevItem */1);
                            case 1 :
                                return /* () */0;
                            case 2 :
                                $$event.preventDefault();
                                return Curry._1(dispatch, /* FocusNextItem */0);
                            
                          }
                        }
                      } else if (key !== 13) {
                        return /* () */0;
                      } else {
                        $$event.preventDefault();
                        return Curry._1(dispatch, /* SelectItem */2);
                      }
                    }),
                  onChange: (function ($$event) {
                      var value = $$event.target.value;
                      Curry._1(dispatch, /* ChangeInputValue */Block.__(0, [value]));
                      return Curry._1(dispatch, /* FilterItems */Block.__(1, [value]));
                    })
                }), React.createElement("ul", undefined, Belt_Array.mapWithIndex(state[/* filteredItems */1], (function (i, item) {
                        var match = i === state[/* focusedItemIndex */2];
                        var style = {
                          backgroundColor: match ? "red" : "blue"
                        };
                        return React.createElement("li", {
                                    key: item[/* value */1],
                                    style: style
                                  }, item[/* label */0]);
                      }))));
}

var make = SelectMenu;

exports.make = make;
/* react Not a pure module */
