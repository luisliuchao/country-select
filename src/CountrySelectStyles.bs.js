'use strict';

var Css = require("bs-css/src/Css.js");

var inputContainer = Css.style(/* :: */[
      Css.fontSize(Css.px(15)),
      /* :: */[
        Css.padding(Css.px(5)),
        /* :: */[
          Css.width(Css.px(150)),
          /* [] */0
        ]
      ]
    ]);

var card = Css.style(/* :: */[
      Css.display(Css.flexBox),
      /* :: */[
        Css.flexDirection(Css.column),
        /* :: */[
          Css.alignItems(Css.stretch),
          /* :: */[
            Css.backgroundColor(Css.white),
            /* :: */[
              Css.boxShadow(Css.Shadow.box(undefined, Css.px(3), Css.px(5), undefined, undefined, Css.rgba(0, 0, 0, 0.3))),
              /* :: */[
                Css.unsafe("-webkit-overflow-scrolling", "touch"),
                /* [] */0
              ]
            ]
          ]
        ]
      ]
    ]);

var title = Css.style(/* :: */[
      Css.fontSize(Css.rem(1.5)),
      /* [] */0
    ]);

function actionButton(disabled) {
  return Css.style(/* :: */[
              Css.background(disabled ? Css.darkgray : Css.white),
              /* :: */[
                Css.color(Css.black),
                /* :: */[
                  Css.border(Css.px(1), Css.solid, Css.black),
                  /* :: */[
                    Css.borderRadius(Css.px(3)),
                    /* [] */0
                  ]
                ]
              ]
            ]);
}

exports.inputContainer = inputContainer;
exports.card = card;
exports.title = title;
exports.actionButton = actionButton;
/* inputContainer Not a pure module */
