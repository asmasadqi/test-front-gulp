"use strict";

const { task, src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

module.exports = function (P, settings) {
  const sassConf = {
    linefeed: "crlf",
  };

  const postCssPlugins = [
    P.postcssImport({
      path: ["../node_modules"],
    }),
    P.autoprefixer(),
  ];

  task("sass", () => {
    if (settings.isBuild) {
      return src(`${settings.src}/scss/*.scss`)
        .pipe(sass(sassConf).on("error", sass.logError))
        .pipe(P.postcss(postCssPlugins))
        .pipe(dest(`${settings.dist}/css`))
        .pipe(P.browserSync.stream());
    }

    return src(`${settings.src}/scss/*.scss`)
      .pipe(sass(sassConf).on("error", sass.logError))
      .pipe(P.postcss(postCssPlugins))
      .pipe(dest(`${settings.temp}/css`))
      .pipe(P.browserSync.stream());
  });
};
