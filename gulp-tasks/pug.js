"use strict";

const { task, src, dest, parallel } = require("gulp");

module.exports = function (P, settings) {
  task("pug", () =>
    src(`${settings.src}/*.pug`, {
      buffer: false,
    })
      .pipe(
        P.pug({
          pretty: true,
          locals: {
            build: true,
          },
        })
      )
      .pipe(dest(settings.dist))
  );
};
