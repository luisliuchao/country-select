'use strict';

var React = require("react");
var SelectMenu$ReasonReactExamples = require("./SelectMenu.bs.js");
var SelectInput$ReasonReactExamples = require("./SelectInput.bs.js");

function CountrySelect(Props) {
  Props.className;
  Props.country;
  Props.onChange;
  return React.createElement("div", undefined, React.createElement(SelectInput$ReasonReactExamples.make, {
                  value: "us",
                  onChange: (function (value) {
                      console.log(value);
                      return /* () */0;
                    })
                }), React.createElement(SelectMenu$ReasonReactExamples.make, { }));
}

var initialState = /* record */[/* value */""];

var make = CountrySelect;

exports.initialState = initialState;
exports.make = make;
/* react Not a pure module */
