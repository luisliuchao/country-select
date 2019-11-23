'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");

var initialState = /* record */[/* value */""];

function SelectInput(Props) {
  var value = Props.value;
  var match = Props.onChange;
  var onChange = match !== undefined ? match : (function (param) {
        return /* () */0;
      });
  var match$1 = Props.onEnter;
  var onEnter = match$1 !== undefined ? match$1 : (function (param) {
        return /* () */0;
      });
  var reducer = function (param, action) {
    if (action.tag) {
      if (action[0] !== 13) {
        return /* NoUpdate */0;
      } else {
        Curry._1(onEnter, /* () */0);
        return /* NoUpdate */0;
      }
    } else {
      var value = action[0];
      Curry._1(onChange, value);
      return /* Update */Block.__(0, [/* record */[/* value */value]]);
    }
  };
  var match$2 = React.useReducer(reducer, /* Update */Block.__(0, [initialState]));
  var dispatch = match$2[1];
  return React.createElement("div", undefined, React.createElement("input", {
                  value: value,
                  onKeyDown: (function ($$event) {
                      return Curry._1(dispatch, /* KeyDown */Block.__(1, [$$event.which]));
                    }),
                  onChange: (function ($$event) {
                      return Curry._1(dispatch, /* Change */Block.__(0, [$$event.target.value]));
                    })
                }));
}

var make = SelectInput;

exports.initialState = initialState;
exports.make = make;
/* react Not a pure module */
