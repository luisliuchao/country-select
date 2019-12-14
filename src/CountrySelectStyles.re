/* Open the Css module, so we can access the style properties below without prefixing them with Css. */
open Css;

let input = style([
  fontSize(px(15)),
  padding(px(5)),
  width(px(150)),
  outlineStyle(none),
  cursor(`pointer),
  focus([
    outlineColor(Css_AtomicTypes.Color.hex("3F84F7")),
    outlineStyle(solid),
    outlineWidth(px(2)),
  ]),
]);
