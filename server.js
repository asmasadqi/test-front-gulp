"use strict";

const pkg = require("./package.json");
const express = require("express");
const path = require("path");

const errorHandler = require("errorhandler");
const readdirSync = require("fs").readdirSync;


  const app = express();

  app.set("case sensitive routing", true);
  app.set("port", 7770);
  app.set("views", __dirname + "/src");
  app.set("view engine", "pug");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use(express.static(path.join(__dirname, "./temp")));
console.log(path.join(__dirname, "./temp"))
  // ---------
  // PUG data
  // ---------
  app.locals.pretty = true;
  app.locals.modules = pkg.subDependencies;
  app.locals.cache = false;
  app.locals.compileDebug = true;
  app.use(
    errorHandler({
      dumpExceptions: true,
      showStack: true,
    })
  );

  // --------------
  // Routes | Pages
  // --------------
  const files = readdirSync(path.join(__dirname, "./src/")).filter((file) =>
    file.endsWith(".pug")
  );

  app.get("/", (req, res, next) => res.render("index"));

  files.forEach((file) => {
    const route = "" + file.split(".").slice(0, -1).join(".");
    app.get(`/${route}.html`, (req, res, next) => {
      res.render(route, { serverMode: true });
    });
  });

  app.listen(app.get("port"), () =>
    console.log("Express server listening on port " + app.get("port"))
  );

