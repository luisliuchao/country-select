'use strict';

var Css = require("bs-css/src/Css.js");
var Css_AtomicTypes = require("bs-css/src/Css_AtomicTypes.js");

var font = Css.px(15);

var activeColor = Css_AtomicTypes.Color.hex("3F84F7");

var focusColor = Css_AtomicTypes.Color.hex("E0EBFD");

var borderColor = Css_AtomicTypes.Color.rgba(0, 0, 0, 0.1);

var container = Css.style(/* :: */[
      Css.fontSize(font),
      /* :: */[
        Css.width(Css.px(250)),
        /* :: */[
          Css.boxShadow(Css.Shadow.box(Css.px(3), Css.px(3), Css.px(10), undefined, undefined, borderColor)),
          /* :: */[
            Css.border(Css.px(1), Css.solid, borderColor),
            /* [] */0
          ]
        ]
      ]
    ]);

var input = Css.style(/* :: */[
      Css.width(Css.pct(100.0)),
      /* :: */[
        Css.padding(Css.px(5)),
        /* :: */[
          Css.fontSize(font),
          /* :: */[
            Css.borderStyle(Css.none),
            /* :: */[
              Css.boxSizing(Css.borderBox),
              /* :: */[
                Css.outlineStyle(Css.none),
                /* :: */[
                  Css.borderBottom(Css.px(1), Css.solid, borderColor),
                  /* [] */0
                ]
              ]
            ]
          ]
        ]
      ]
    ]);

var listContainer = Css.style(/* :: */[
      Css.padding(Css.px(0)),
      /* :: */[
        Css.margin(Css.px(0)),
        /* :: */[
          Css.listStyleType(Css.none),
          /* :: */[
            Css.maxHeight(Css.px(200)),
            /* :: */[
              Css.overflowY(Css.auto),
              /* :: */[
                Css.position(Css.relative),
                /* [] */0
              ]
            ]
          ]
        ]
      ]
    ]);

function listItem(focus, active) {
  return Css.style(/* :: */[
              Css.padding(Css.px(5)),
              /* :: */[
                Css.fontSize(Css.px(15)),
                /* :: */[
                  Css.backgroundColor(active ? activeColor : (
                          focus ? focusColor : Css.white
                        )),
                  /* :: */[
                    Css.color(active ? Css.white : Css.black),
                    /* :: */[
                      Css.cursor(/* pointer */-786317123),
                      /* :: */[
                        Css.display(/* flex */-1010954439),
                        /* :: */[
                          Css.alignItems(/* flexStart */662439529),
                          /* [] */0
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]);
}

var itemMap = Css.style(/* :: */[
      Css.marginRight(Css.px(10)),
      /* :: */[
        Css.width(Css.px(20)),
        /* :: */[
          Css.height(Css.px(15)),
          /* [] */0
        ]
      ]
    ]);

var itemLabel = Css.style(/* :: */[
      Css.flex(/* `num */[
            5496390,
            1.0
          ]),
      /* [] */0
    ]);

exports.font = font;
exports.activeColor = activeColor;
exports.focusColor = focusColor;
exports.borderColor = borderColor;
exports.container = container;
exports.input = input;
exports.listContainer = listContainer;
exports.listItem = listItem;
exports.itemMap = itemMap;
exports.itemLabel = itemLabel;
/* font Not a pure module */
