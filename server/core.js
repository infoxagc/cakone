const serverless = require("serverless-http");
const express = require("express");
const path = require("path");
const { Home, Post, Cdn } = require("./controllers");

const app = express();
app.use(express.static("public"));

app.get("/", Home);
app.get("/:query", Post);
app.get("/cdn/:query.png", Cdn);

module.exports = app;
module.exports.handler = serverless(app);
