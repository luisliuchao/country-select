'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Utils$ReasonReactExamples = require("./Utils.bs.js");
var Decode$ReasonReactExamples = require("./Decode.bs.js");
var SelectMenu$ReasonReactExamples = require("./SelectMenu.bs.js");
var CountrySelectStyles$ReasonReactExamples = require("./CountrySelectStyles.bs.js");

function CountrySelect(Props) {
  var className = Props.className;
  var country = Props.country;
  var match = Props.onChange;
  var onChange = match !== undefined ? match : (function (param) {
        return /* () */0;
      });
  var match$1 = React.useState((function () {
          return /* record */[
                  /* countries : LoadingCountries */0,
                  /* selectedCountry */undefined,
                  /* isMenuOpen */false
                ];
        }));
  var setState = match$1[1];
  var state = match$1[0];
  React.useEffect((function () {
          fetch("https://gist.githubusercontent.com/rusty-key/659db3f4566df459bd59c8a53dc9f71f/raw/4127f9550ef063121c564025f6d27dceeb279623/counties.json").then((function (response) {
                      return response.json();
                    })).then((function (jsonResponse) {
                    var items = Decode$ReasonReactExamples.countries(jsonResponse);
                    if (country !== undefined) {
                      var value = country;
                      var selectedItem = Belt_Array.getBy(items, (function (item) {
                              return item[/* value */1] === value.toLowerCase();
                            }));
                      if (selectedItem !== undefined) {
                        Curry._1(setState, (function (state) {
                                return /* record */[
                                        /* countries */state[/* countries */0],
                                        /* selectedCountry */selectedItem,
                                        /* isMenuOpen */state[/* isMenuOpen */2]
                                      ];
                              }));
                      }
                      
                    }
                    Curry._1(setState, (function (state) {
                            return /* record */[
                                    /* countries : LoadedCountries */[items],
                                    /* selectedCountry */state[/* selectedCountry */1],
                                    /* isMenuOpen */state[/* isMenuOpen */2]
                                  ];
                          }));
                    return Promise.resolve(/* () */0);
                  })).catch((function (_err) {
                  Curry._1(setState, (function (state) {
                          return /* record */[
                                  /* countries : ErrorFetchingCountries */1,
                                  /* selectedCountry */state[/* selectedCountry */1],
                                  /* isMenuOpen */state[/* isMenuOpen */2]
                                ];
                        }));
                  return Promise.resolve(/* () */0);
                }));
          return ;
        }), ([]));
  var resetFocus = function (param) {
    var inputEle = Utils$ReasonReactExamples.getElementById("CountrySelect-input");
    if (inputEle !== undefined) {
      Caml_option.valFromOption(inputEle).focus();
      return /* () */0;
    } else {
      return /* () */0;
    }
  };
  var handleSelect = function (country) {
    Curry._1(setState, (function (state) {
            return /* record */[
                    /* countries */state[/* countries */0],
                    /* selectedCountry */country,
                    /* isMenuOpen */false
                  ];
          }));
    resetFocus(/* () */0);
    return Curry._1(onChange, country[/* value */1]);
  };
  var selectedCountry = state[/* selectedCountry */1];
  var countries = state[/* countries */0];
  return React.createElement("div", {
              className: className,
              onKeyDown: (function ($$event) {
                  var key = $$event.which;
                  if (key !== 13) {
                    if (key !== 27) {
                      return /* () */0;
                    } else {
                      Curry._1(setState, (function (state) {
                              return /* record */[
                                      /* countries */state[/* countries */0],
                                      /* selectedCountry */state[/* selectedCountry */1],
                                      /* isMenuOpen */false
                                    ];
                            }));
                      return resetFocus(/* () */0);
                    }
                  } else {
                    return Curry._1(setState, (function (state) {
                                  return /* record */[
                                          /* countries */state[/* countries */0],
                                          /* selectedCountry */state[/* selectedCountry */1],
                                          /* isMenuOpen */true
                                        ];
                                }));
                  }
                })
            }, React.createElement("input", {
                  className: CountrySelectStyles$ReasonReactExamples.input,
                  id: "CountrySelect-input",
                  readOnly: true,
                  value: selectedCountry !== undefined ? selectedCountry[/* label */0] : "",
                  onClick: (function (param) {
                      return Curry._1(setState, (function (state) {
                                    return /* record */[
                                            /* countries */state[/* countries */0],
                                            /* selectedCountry */state[/* selectedCountry */1],
                                            /* isMenuOpen */true
                                          ];
                                  }));
                    })
                }), state[/* isMenuOpen */2] ? (
                typeof countries === "number" ? (
                    countries !== 0 ? React.createElement("div", undefined, "An error occurred!") : React.createElement("div", undefined, "Loading...")
                  ) : React.createElement(SelectMenu$ReasonReactExamples.make, {
                        items: countries[0],
                        selectedItem: selectedCountry,
                        onSelect: handleSelect
                      })
              ) : React.createElement("div", undefined));
}

var Styles = 0;

var make = CountrySelect;

exports.Styles = Styles;
exports.make = make;
/* react Not a pure module */
