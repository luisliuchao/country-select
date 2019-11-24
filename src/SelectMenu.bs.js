'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var SelectMenuStyles$ReasonReactExamples = require("./SelectMenuStyles.bs.js");

function SelectMenu(Props) {
  var items = Props.items;
  var selectedItem = Props.selectedItem;
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
                return item[/* label */0].toLowerCase().includes(inputValue.toLowerCase());
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
  var state = match$1[0];
  var focusedItemIndex = state[/* focusedItemIndex */2];
  var filteredItems = state[/* filteredItems */1];
  var dispatch = match$1[1];
  return React.createElement("div", {
              className: SelectMenuStyles$ReasonReactExamples.container
            }, React.createElement("input", {
                  className: SelectMenuStyles$ReasonReactExamples.input,
                  placeholder: "Search",
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
                }), React.createElement("ul", {
                  className: SelectMenuStyles$ReasonReactExamples.list
                }, Belt_Array.mapWithIndex(filteredItems, (function (i, item) {
                        var focus = i === focusedItemIndex;
                        var active = Caml_obj.caml_equal(Caml_array.caml_array_get(filteredItems, i), selectedItem);
                        return React.createElement("li", {
                                    key: item[/* value */1],
                                    className: SelectMenuStyles$ReasonReactExamples.listItem(focus, active)
                                  }, item[/* label */0]);
                      }))));
}

var Styles = 0;

var make = SelectMenu;

exports.Styles = Styles;
exports.make = make;
/* react Not a pure module */
