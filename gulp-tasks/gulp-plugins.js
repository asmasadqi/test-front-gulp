const pkg = require("../package.json");
const P = require("gulp-load-plugins")({
  config: pkg,
});

// require non gulp-modules
P.del = require("del");
P.browserSync = require("browser-sync").create("server");
P.fileExists = require("file-exists");
P.autoprefixer = require("autoprefixer");
P.postcssImport = require("postcss-import");
P.log = require("fancy-log");

module.exports = P;
