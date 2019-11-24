'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var IndexStyles$ReasonReactExamples = require("./IndexStyles.bs.js");
var CountrySelect$ReasonReactExamples = require("./CountrySelect.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

style.innerHTML = IndexStyles$ReasonReactExamples.style;

function makeContainer(text) {
  var container = document.createElement("div");
  container.className = "container";
  var title = document.createElement("div");
  title.className = "containerTitle";
  title.innerText = text;
  var content = document.createElement("div");
  content.className = "containerContent";
  container.appendChild(title);
  container.appendChild(content);
  document.body.appendChild(container);
  return content;
}

ReactDom.render(React.createElement(CountrySelect$ReasonReactExamples.make, {
          className: "custom-class",
          country: "ax",
          onChange: (function (country) {
              console.log(country);
              return /* () */0;
            })
        }), makeContainer("Country Select"));

exports.style = style;
exports.makeContainer = makeContainer;
/* style Not a pure module */
