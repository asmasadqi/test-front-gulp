"use strict";

const express = require("express");
const path = require("path");
const fs = require("fs");
const errorHandler = require("errorhandler");
const pkg = require("./package.json");

const app = express();
const PORT = 7770;

// Configuration de base
app.set("case sensitive routing", true);
app.set("port", PORT);
app.set("views", path.join(__dirname, "/src"));
app.set("view engine", "pug");

// Middleware pour CORS et headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Serve static files from 'temp' directory
app.use(express.static(path.join(__dirname, "temp")));

// PUG local variables
app.locals = {
  pretty: true,
  modules: pkg.subDependencies,
  cache: false,
  compileDebug: true
};

// Error handling middleware
app.use(errorHandler({ dumpExceptions: true, showStack: true }));

// Dynamic route generation for Pug files
const pugFiles = fs.readdirSync(path.join(__dirname, "src")).filter(file => file.endsWith(".pug"));
pugFiles.forEach(file => {
  const route = file.split(".").slice(0, -1).join(".");
  app.get(`/${route}.html`, (req, res) => res.render(route, { serverMode: true }));
});

// Home route
app.get("/", (req, res) => res.render("index"));

// Start server
app.listen(app.get("port"), () => {
  console.log(`Express server listening on port ${app.get("port")}`);
});