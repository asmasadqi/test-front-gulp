"use strict";

const { task, src, dest } = require("gulp");

module.exports = function (P, settings) {
  task("copy", () =>
    src([`${settings.src}/images/**/*`]).pipe(
      P.if(settings.isBuild, dest(`${settings.dist}/images`), dest(`${settings.temp}/images`))
    )
  );
};
