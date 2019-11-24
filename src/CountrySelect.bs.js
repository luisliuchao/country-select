'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Decode$ReasonReactExamples = require("./Decode.bs.js");
var SelectMenu$ReasonReactExamples = require("./SelectMenu.bs.js");

function CountrySelect(Props) {
  Props.className;
  Props.country;
  var match = Props.onChange;
  var onChange = match !== undefined ? match : (function (param) {
        return /* () */0;
      });
  var match$1 = React.useState((function () {
          return /* record */[
                  /* countries : LoadingCountries */0,
                  /* selectedCountry */undefined
                ];
        }));
  var setState = match$1[1];
  var state = match$1[0];
  React.useEffect((function () {
          fetch("https://gist.githubusercontent.com/rusty-key/659db3f4566df459bd59c8a53dc9f71f/raw/4127f9550ef063121c564025f6d27dceeb279623/counties.json").then((function (response) {
                      return response.json();
                    })).then((function (jsonResponse) {
                    var items = Decode$ReasonReactExamples.countries(jsonResponse);
                    Curry._1(setState, (function (state) {
                            return /* record */[
                                    /* countries : LoadedCountries */[items],
                                    /* selectedCountry */state[/* selectedCountry */1]
                                  ];
                          }));
                    return Promise.resolve(/* () */0);
                  })).catch((function (_err) {
                  Curry._1(setState, (function (state) {
                          return /* record */[
                                  /* countries : ErrorFetchingCountries */1,
                                  /* selectedCountry */state[/* selectedCountry */1]
                                ];
                        }));
                  return Promise.resolve(/* () */0);
                }));
          return ;
        }), ([]));
  var handleSelect = function (country) {
    Curry._1(setState, (function (state) {
            return /* record */[
                    /* countries */state[/* countries */0],
                    /* selectedCountry */country
                  ];
          }));
    return Curry._1(onChange, country[/* value */1]);
  };
  var match$2 = state[/* selectedCountry */1];
  var match$3 = state[/* countries */0];
  return React.createElement("div", undefined, match$2 !== undefined ? match$2[/* label */0] : "Nothing selected", typeof match$3 === "number" ? (
                match$3 !== 0 ? React.createElement("div", undefined, "An error occurred!") : React.createElement("div", undefined, "Loading...")
              ) : React.createElement(SelectMenu$ReasonReactExamples.make, {
                    items: match$3[0],
                    onSelect: handleSelect
                  }));
}

var make = CountrySelect;

exports.make = make;
/* react Not a pure module */
