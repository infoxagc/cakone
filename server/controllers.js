const unirest = require("unirest");
const { getImages, getSentences } = require("./api");
const { getFile, validStr } = require("./utils");

const set = async (obj) => {
  let data = await getFile("settings.json");
  data = JSON.parse(data);
  return data[obj];
};

const Home = async (req, res) => {
  return res.send("/");
};

const Post = async (req, res) => {
  let query = req.params.query;
  query = await validStr(query);
  return res.send(query);
};

const Cdn = async (req, res) => {
  try {
    let query = req.params.query;
    query = await validStr(query);
    let img = await getImages(query);
    let turl = img[Math.floor(Math.random() * 10)]["thumbnail"];

    await unirest
      .get(turl)
      .encoding(null)
      .end(async (e) => {
        if (e.error) {
        } else {
          const data = Buffer.from(e.raw_body);
          res.type("image/png");
          res.send(data);
        }
      });
  } catch (e) {}
};

module.exports = { Home, Post, Cdn };
