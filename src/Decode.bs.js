'use strict';

var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");

function country(json) {
  return /* record */[
          /* label */Json_decode.field("label", Json_decode.string, json),
          /* value */Json_decode.field("value", Json_decode.string, json)
        ];
}

function countries(param) {
  return Json_decode.array(country, param);
}

exports.country = country;
exports.countries = countries;
/* No side effect */
