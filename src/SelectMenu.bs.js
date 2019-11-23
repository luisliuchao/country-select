'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");

function decodeCountry(json) {
  return /* record */[
          /* value */Json_decode.field("value", Json_decode.string, json),
          /* label */Json_decode.field("label", Json_decode.string, json)
        ];
}

function decodeCountries(param) {
  return Json_decode.array(decodeCountry, param);
}

function SelectMenu(Props) {
  var match = React.useState((function () {
          return /* LoadingCountries */0;
        }));
  var setCountries = match[1];
  var countries = match[0];
  React.useEffect((function () {
          fetch("https://gist.githubusercontent.com/rusty-key/659db3f4566df459bd59c8a53dc9f71f/raw/4127f9550ef063121c564025f6d27dceeb279623/counties.json").then((function (response) {
                      return response.json();
                    })).then((function (jsonResponse) {
                    var data = Json_decode.array(decodeCountry, jsonResponse);
                    Curry._1(setCountries, (function (param) {
                            return /* LoadedCountries */[data];
                          }));
                    return Promise.resolve(/* () */0);
                  })).catch((function (_err) {
                  Curry._1(setCountries, (function (param) {
                          return /* ErrorFetchingCountries */1;
                        }));
                  return Promise.resolve(/* () */0);
                }));
          return ;
        }), ([]));
  return React.createElement("ul", undefined, typeof countries === "number" ? (
                countries !== 0 ? React.createElement("li", undefined, "An error occurred!") : React.createElement("li", undefined, "Loading...")
              ) : Belt_Array.mapWithIndex(countries[0], (function (i, country) {
                      return React.createElement("li", {
                                  key: country[/* label */1]
                                }, country[/* value */0]);
                    })));
}

var make = SelectMenu;

exports.decodeCountry = decodeCountry;
exports.decodeCountries = decodeCountries;
exports.make = make;
/* react Not a pure module */
