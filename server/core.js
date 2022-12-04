const serverless = require("serverless-http");
const express = require("express");
const path = require("path");
const { Home, Post, Cdn } = require("./app/controllers");

const app = express();
app.use(express.static(path.join(__dirname, "..", "public")));
app.disable("x-powered-by");
app.enable("trust proxy");

app.get("/", Home);
app.get("/:query", Post);
app.get("/cdn/:query.png", Cdn);

module.exports = app;
module.exports.handler = serverless(app);
