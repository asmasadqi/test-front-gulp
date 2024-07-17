"use strict";

const { task } = require("gulp");

module.exports = function(P, settings) {
  task("nodemon", (cb) => {
    let started = false;

    return P.nodemon({
      script: "server.js",
      ignore: ["src/images", "temp"],
      ext: "js",
      env: { NODE_ENV: "production" },
    }).on("start", function() {
      if (!started) {
        started = true;
        cb();
      }
    });
  });
};
