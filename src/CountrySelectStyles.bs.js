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

exports.inputContainer = inputContainer;
/* inputContainer Not a pure module */
