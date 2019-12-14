'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Utils$ReasonReactExamples = require("./Utils.bs.js");
var SelectMenuStyles$ReasonReactExamples = require("./SelectMenuStyles.bs.js");

function SelectMenu(Props) {
  var items = Props.items;
  var selectedItem = Props.selectedItem;
  var match = Props.onSelect;
  var onSelect = match !== undefined ? match : (function (param) {
        return /* () */0;
      });
  var match$1 = React.useState((function () {
          return false;
        }));
  var setIsScrolling = match$1[1];
  var isScrollingMenu = match$1[0];
  var initialState = /* record */[
    /* inputValue */"",
    /* filteredItems */items,
    /* focusedItemIndex */0
  ];
  var scrollMenu = function (distance) {
    var containerEle = Utils$ReasonReactExamples.getElementById("CountrySelect-list-container");
    if (containerEle !== undefined) {
      Caml_option.valFromOption(containerEle).scrollTop = distance;
      Curry._1(setIsScrolling, (function (param) {
              return true;
            }));
      setTimeout((function (param) {
              return Curry._1(setIsScrolling, (function (param) {
                            return false;
                          }));
            }), 100);
      return /* () */0;
    } else {
      return /* () */0;
    }
  };
  var checkMenuScroll = function (index) {
    var containerEle = Utils$ReasonReactExamples.getElementById("CountrySelect-list-container");
    if (containerEle !== undefined) {
      var container = Caml_option.valFromOption(containerEle);
      var containerHeight = container.clientHeight;
      var containerScrollTop = container.scrollTop;
      var itemEle = Utils$ReasonReactExamples.getElementById("CountrySelect-list-item-" + String(index));
      if (itemEle !== undefined) {
        var item = Caml_option.valFromOption(itemEle);
        var itemHeight = item.clientHeight;
        var itemOffsetTop = item.offsetTop;
        var bottomDiff = containerScrollTop + containerHeight - (itemHeight + itemOffsetTop);
        if (bottomDiff < 0.0) {
          return scrollMenu(-1.0 * bottomDiff + containerScrollTop);
        } else {
          var topDiff = itemOffsetTop - containerScrollTop;
          if (topDiff < 0.0) {
            return scrollMenu(topDiff + containerScrollTop);
          } else {
            return 0;
          }
        }
      } else {
        return /* () */0;
      }
    } else {
      return /* () */0;
    }
  };
  var reducer = function (state, action) {
    var focusedItemIndex = state[/* focusedItemIndex */2];
    if (typeof action === "number") {
      if (action === /* FocusNextItem */0) {
        if (focusedItemIndex < (state[/* filteredItems */1].length - 1 | 0)) {
          var newIndex = focusedItemIndex + 1 | 0;
          checkMenuScroll(newIndex);
          return /* record */[
                  /* inputValue */state[/* inputValue */0],
                  /* filteredItems */state[/* filteredItems */1],
                  /* focusedItemIndex */newIndex
                ];
        } else {
          return state;
        }
      } else if (focusedItemIndex > 0) {
        var newIndex$1 = focusedItemIndex - 1 | 0;
        checkMenuScroll(newIndex$1);
        return /* record */[
                /* inputValue */state[/* inputValue */0],
                /* filteredItems */state[/* filteredItems */1],
                /* focusedItemIndex */newIndex$1
              ];
      } else {
        return state;
      }
    } else {
      switch (action.tag | 0) {
        case /* ChangeInputValue */0 :
            return /* record */[
                    /* inputValue */action[0],
                    /* filteredItems */state[/* filteredItems */1],
                    /* focusedItemIndex */state[/* focusedItemIndex */2]
                  ];
        case /* FilterItems */1 :
            var inputValue = action[0];
            var filteredItems = Belt_Array.keep(items, (function (item) {
                    if (inputValue === "") {
                      return true;
                    } else {
                      return item[/* label */0].toLowerCase().includes(inputValue.toLowerCase());
                    }
                  }));
            return /* record */[
                    /* inputValue */state[/* inputValue */0],
                    /* filteredItems */filteredItems,
                    /* focusedItemIndex */0
                  ];
        case /* FocusItem */2 :
            return /* record */[
                    /* inputValue */state[/* inputValue */0],
                    /* filteredItems */state[/* filteredItems */1],
                    /* focusedItemIndex */action[0]
                  ];
        case /* SelectItem */3 :
            Curry._1(onSelect, action[0]);
            return state;
        
      }
    }
  };
  var match$2 = React.useReducer(reducer, initialState);
  var state = match$2[0];
  var focusedItemIndex = state[/* focusedItemIndex */2];
  var filteredItems = state[/* filteredItems */1];
  var dispatch = match$2[1];
  React.useEffect((function () {
          var inputEle = Utils$ReasonReactExamples.getElementById("CountrySelect-filter");
          if (inputEle !== undefined) {
            Caml_option.valFromOption(inputEle).focus();
          }
          if (selectedItem !== undefined) {
            checkMenuScroll(filteredItems.indexOf(selectedItem));
          }
          return ;
        }), ([]));
  return React.createElement("div", {
              className: SelectMenuStyles$ReasonReactExamples.container
            }, React.createElement("input", {
                  className: SelectMenuStyles$ReasonReactExamples.input,
                  id: "CountrySelect-filter",
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
                        if (filteredItems.length > focusedItemIndex) {
                          var item = Caml_array.caml_array_get(filteredItems, focusedItemIndex);
                          return Curry._1(dispatch, /* SelectItem */Block.__(3, [item]));
                        } else {
                          return 0;
                        }
                      }
                    }),
                  onChange: (function ($$event) {
                      var value = $$event.target.value;
                      Curry._1(dispatch, /* ChangeInputValue */Block.__(0, [value]));
                      return Curry._1(dispatch, /* FilterItems */Block.__(1, [value]));
                    })
                }), React.createElement("ul", {
                  className: SelectMenuStyles$ReasonReactExamples.listContainer,
                  id: "CountrySelect-list-container",
                  onClick: (function ($$event) {
                      var label = $$event.target.innerText;
                      var item = Belt_Array.getBy(filteredItems, (function (item) {
                              return item[/* label */0] === label;
                            }));
                      if (item !== undefined) {
                        return Curry._1(dispatch, /* SelectItem */Block.__(3, [item]));
                      } else {
                        return /* () */0;
                      }
                    })
                }, Belt_Array.mapWithIndex(filteredItems, (function (i, item) {
                        var focus = i === focusedItemIndex;
                        var active = Caml_obj.caml_equal(Caml_array.caml_array_get(filteredItems, i), selectedItem);
                        return React.createElement("li", {
                                    key: item[/* value */1],
                                    className: SelectMenuStyles$ReasonReactExamples.listItem(focus, active),
                                    id: "CountrySelect-list-item-" + String(i),
                                    onMouseEnter: (function (param) {
                                        if (isScrollingMenu) {
                                          return 0;
                                        } else {
                                          return Curry._1(dispatch, /* FocusItem */Block.__(2, [i]));
                                        }
                                      })
                                  }, React.createElement("span", {
                                        className: "flag-icon flag-icon-" + (item[/* value */1] + (" " + SelectMenuStyles$ReasonReactExamples.itemMap))
                                      }), React.createElement("span", {
                                        className: SelectMenuStyles$ReasonReactExamples.itemLabel
                                      }, item[/* label */0]));
                      }))));
}

var Styles = 0;

var make = SelectMenu;

exports.Styles = Styles;
exports.make = make;
/* react Not a pure module */
