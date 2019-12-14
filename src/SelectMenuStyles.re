/* Open the Css module, so we can access the style properties below without prefixing them with Css. */
open Css;

let font = px(15);
let activeColor = Css_AtomicTypes.Color.hex("3F84F7");
let focusColor = Css_AtomicTypes.Color.hex("E0EBFD");
let borderColor = Css_AtomicTypes.Color.rgba(0, 0, 0, 0.1);

let container = style([
  fontSize(font),
  width(px(250)),
  boxShadow(Shadow.box(~x=px(3), ~y=px(3), ~blur=px(10), borderColor)),
  border(px(1), solid, borderColor),
]);

let input = style([
  width(pct(100.0)),
  padding(px(5)),
  fontSize(font),
  borderStyle(none),
  boxSizing(borderBox),
  outlineStyle(none),
  borderBottom(px(1), solid, borderColor),
]);

let listContainer = style([
  padding(px(0)),
  margin(px(0)),
  listStyleType(none),
  maxHeight(px(200)),
  overflowY(auto),
  position(relative),
]);

let listItem = (~focus: bool, ~active: bool) =>  
  style([
    padding(px(5)),
    fontSize(px(15)),
    backgroundColor(active ? activeColor : focus ? focusColor : white),
    color(active ? white : black),
    cursor(`pointer),
    hover([
      backgroundColor(active ? activeColor : focusColor)
    ]),
    display(`flex),
    alignItems(`flexStart)
  ]);

let itemMap = style([
  marginRight(px(10)),
  width(px(20)),
  height(px(15)),
]);

let itemLabel=style([
  flex(`num(1.0)),
])