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

function CountrySelect(Props) {
  var match = React.useState((function () {
          return /* LoadingCountries */0;
        }));
  var setState = match[1];
  var state = match[0];
  React.useEffect((function () {
          fetch("https://gist.githubusercontent.com/rusty-key/659db3f4566df459bd59c8a53dc9f71f/raw/4127f9550ef063121c564025f6d27dceeb279623/counties.json").then((function (response) {
                      return response.json();
                    })).then((function (jsonResponse) {
                    var countries = Json_decode.array(decodeCountry, jsonResponse);
                    Curry._1(setState, (function (_previousState) {
                            return /* LoadedCountries */[countries];
                          }));
                    return Promise.resolve(/* () */0);
                  })).catch((function (_err) {
                  Curry._1(setState, (function (_previousState) {
                          return /* ErrorFetchingCountries */1;
                        }));
                  return Promise.resolve(/* () */0);
                }));
          return ;
        }), ([]));
  return React.createElement("div", {
              style: {
                display: "flex",
                height: "120px",
                alignItems: "center",
                justifyContent: "center"
              }
            }, typeof state === "number" ? (
                state !== 0 ? "An error occurred!" : "Loading..."
              ) : Belt_Array.mapWithIndex(state[0], (function (i, country) {
                      return React.createElement("div", undefined, country[/* value */0]);
                    })));
}

var make = CountrySelect;

exports.decodeCountry = decodeCountry;
exports.decodeCountries = decodeCountries;
exports.make = make;
/* react Not a pure module */