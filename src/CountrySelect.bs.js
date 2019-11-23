'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Decode$ReasonReactExamples = require("./Decode.bs.js");
var SelectMenu$ReasonReactExamples = require("./SelectMenu.bs.js");
var SelectInput$ReasonReactExamples = require("./SelectInput.bs.js");

function CountrySelect(Props) {
  Props.className;
  var country = Props.country;
  Props.onChange;
  var inputValue = country !== undefined ? country : "";
  var initialState_002 = /* allCountries : array */[];
  var initialState = /* record */[
    /* inputValue */inputValue,
    /* countries : LoadingCountries */0,
    initialState_002
  ];
  var match = React.useState((function () {
          return initialState;
        }));
  var setState = match[1];
  var state = match[0];
  React.useEffect((function () {
          fetch("https://gist.githubusercontent.com/rusty-key/659db3f4566df459bd59c8a53dc9f71f/raw/4127f9550ef063121c564025f6d27dceeb279623/counties.json").then((function (response) {
                      return response.json();
                    })).then((function (jsonResponse) {
                    var data = Decode$ReasonReactExamples.countries(jsonResponse);
                    Curry._1(setState, (function (state) {
                            return /* record */[
                                    /* inputValue */state[/* inputValue */0],
                                    /* countries : LoadedCountries */[data],
                                    /* allCountries */data
                                  ];
                          }));
                    return Promise.resolve(/* () */0);
                  })).catch((function (_err) {
                  Curry._1(setState, (function (state) {
                          return /* record */[
                                  /* inputValue */state[/* inputValue */0],
                                  /* countries : ErrorFetchingCountries */1,
                                  /* allCountries */state[/* allCountries */2]
                                ];
                        }));
                  return Promise.resolve(/* () */0);
                }));
          return ;
        }), ([]));
  var handleValueChange = function (value) {
    var match = state[/* countries */1];
    if (typeof match !== "number") {
      var filteredItems = Belt_Array.keep(state[/* allCountries */2], (function (item) {
              if (value === "") {
                return true;
              } else {
                return item[/* label */0].toLowerCase().includes(value);
              }
            }));
      Curry._1(setState, (function (state) {
              return /* record */[
                      /* inputValue */state[/* inputValue */0],
                      /* countries : LoadedCountries */[filteredItems],
                      /* allCountries */state[/* allCountries */2]
                    ];
            }));
    }
    return Curry._1(setState, (function (state) {
                  return /* record */[
                          /* inputValue */value,
                          /* countries */state[/* countries */1],
                          /* allCountries */state[/* allCountries */2]
                        ];
                }));
  };
  var match$1 = state[/* countries */1];
  return React.createElement("div", undefined, React.createElement(SelectInput$ReasonReactExamples.make, {
                  value: state[/* inputValue */0],
                  onChange: handleValueChange
                }), typeof match$1 === "number" ? (
                match$1 !== 0 ? React.createElement("div", undefined, "An error occurred!") : React.createElement("div", undefined, "Loading...")
              ) : React.createElement(SelectMenu$ReasonReactExamples.make, {
                    items: match$1[0]
                  }));
}

var make = CountrySelect;

exports.make = make;
/* react Not a pure module */
