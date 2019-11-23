'use strict';

var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");

function SelectMenu(Props) {
  var items = Props.items;
  return React.createElement("ul", undefined, Belt_Array.map(items, (function (item) {
                    return React.createElement("li", {
                                key: item[/* value */1]
                              }, item[/* label */0]);
                  })));
}

var make = SelectMenu;

exports.make = make;
/* react Not a pure module */
