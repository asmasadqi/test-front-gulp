"use strict";

const { task } = require("gulp");

module.exports = function(P, settings) {
  task("del", () => {
    if (!settings.isBuild) {return P.del(["temp"]);}
    else{
      return P.del([settings.dist], {
        force: true,
      });}
  });
};
