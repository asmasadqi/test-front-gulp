"use strict";

const { task, watch, series } = require("gulp");

module.exports = function (P) {
  task(
    "browserSync",
    series("nodemon", (cb) => {
      P.browserSync.init(null, {
        port: 7771,
        ui: {
          port: 7772,
        },
        ignore: [
          "./dist/**",
          "./node_modules/**",
        ],
        proxy: `http://localhost:7770`,
        reloadOnRestart: true,
        open: false,
        reloadDebounce: 1000,
        reloadDelay: 1000,
        ghostMode: false,
        notify: false,
      });

      watch("src/**/*.pug").on("change", P.browserSync.reload);
      watch("src/**/*.scss", series("sass"));
      cb();
    })
  );
};
