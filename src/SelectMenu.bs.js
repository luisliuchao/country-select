'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");

function SelectMenu(Props) {
  var items = Props.items;
  Props.onSelect;
  var initialState = /* record */[
    /* inputValue */"",
    /* filteredItems */items,
    /* focusedItemIndex */0
  ];
  var reducer = function (state, action) {
    var focusedItemIndex = state[/* focusedItemIndex */2];
    if (typeof action === "number") {
      if (action === /* FocusNextItem */0) {
        if (focusedItemIndex < (state[/* filteredItems */1].length - 1 | 0)) {
          return /* record */[
                  /* inputValue */state[/* inputValue */0],
                  /* filteredItems */state[/* filteredItems */1],
                  /* focusedItemIndex */focusedItemIndex + 1 | 0
                ];
        } else {
          return state;
        }
      } else if (focusedItemIndex > 0) {
        return /* record */[
                /* inputValue */state[/* inputValue */0],
                /* filteredItems */state[/* filteredItems */1],
                /* focusedItemIndex */focusedItemIndex - 1 | 0
              ];
      } else {
        return state;
      }
    } else if (action.tag) {
      var inputValue = action[0];
      var filteredItems = Belt_Array.keep(items, (function (item) {
              if (inputValue === "") {
                return true;
              } else {
                return item[/* label */0].toLowerCase().includes(inputValue);
              }
            }));
      return /* record */[
              /* inputValue */state[/* inputValue */0],
              /* filteredItems */filteredItems,
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
  var match = React.useReducer(reducer, initialState);
  var dispatch = match[1];
  var state = match[0];
  return React.createElement("div", undefined, React.createElement("input", {
                  value: state[/* inputValue */0],
                  onKeyDown: (function ($$event) {
                      var key = $$event.which;
                      switch (key) {
                        case 38 :
                            $$event.preventDefault();
                            return Curry._1(dispatch, /* FocusPrevItem */1);
                        case 39 :
                            return /* () */0;
                        case 40 :
                            $$event.preventDefault();
                            return Curry._1(dispatch, /* FocusNextItem */0);
                        default:
                          return /* () */0;
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
