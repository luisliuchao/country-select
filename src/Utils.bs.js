'use strict';

var Webapi = require("bs-webapi/src/Webapi.js");
var Webapi__Dom = require("bs-webapi/src/Webapi/Webapi__Dom.js");
var Webapi__Dom__Element = require("bs-webapi/src/Webapi/Webapi__Dom/Webapi__Dom__Element.js");

function getElementById(id) {
  var element = document.getElementById(id);
  if (element == null) {
    return ;
  } else {
    return Webapi__Dom__Element.asHtmlElement(element);
  }
}

exports.getElementById = getElementById;
/* Webapi Not a pure module */
