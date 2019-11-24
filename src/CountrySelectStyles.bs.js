'use strict';

var Css = require("bs-css/src/Css.js");
var Css_AtomicTypes = require("bs-css/src/Css_AtomicTypes.js");

var input = Css.style(/* :: */[
      Css.fontSize(Css.px(15)),
      /* :: */[
        Css.padding(Css.px(5)),
        /* :: */[
          Css.width(Css.px(150)),
          /* :: */[
            Css.outlineStyle(Css.none),
            /* :: */[
              Css.cursor(Css.auto),
              /* :: */[
                Css.focus(/* :: */[
                      Css.outlineColor(Css_AtomicTypes.Color.hex("3F84F7")),
                      /* :: */[
                        Css.outlineStyle(Css.solid),
                        /* :: */[
                          Css.outlineWidth(Css.px(2)),
                          /* [] */0
                        ]
                      ]
                    ]),
                /* [] */0
              ]
            ]
          ]
        ]
      ]
    ]);

exports.input = input;
/* input Not a pure module */
