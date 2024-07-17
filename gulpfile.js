"use strict";

const { task, series, parallel } = require("gulp");
const P = require("./gulp-tasks/gulp-plugins");

const settings = {
  isBuild: false,
  dist: "./dist",
  src: "./src",
  temp: "./temp",
}

const tasks = require("require-dir")("gulp-tasks");
tasks.del(P, settings);
tasks.copy(P, settings);
tasks.css(P, settings);
tasks.pug(P, settings);
tasks.nodemon(P, settings);
tasks.browserSync(P, settings);

task("set-build-env", (cb) => {
  settings.isBuild = true;
  cb();
});

task(
  "default-build-tasks",
  parallel("sass", "copy")
);

task(
  "default",
  series("del", "default-build-tasks", "browserSync")
);

task(
  "prod",
  series(
    "del",
    "set-build-env",
    "default-build-tasks",
    "pug"
  )
);
