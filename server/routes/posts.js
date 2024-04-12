const express = require("express");
const postsRouter = express.Router();
const mysql = require("mysql");
const postsService = require("../services/postsService");

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "psi",
});
postsRouter.get("/", (req, res) => {
  postsService
    .getPosts(database)
    .then((rows) => res.send(rows))
    .catch((err) => res.status(err.status).send(err.reason));
});
postsRouter.post("/", (req, res) => {
  postsService
    .newPost(req.body, database)
    .then((result) => res.status(result.status).send())
    .catch((err) => res.status(err.status).send(err.reason));
});

postsRouter.put("/", (req, res) => {
  postsService
    .updatePost(req.body, database)
    .then((result) => res.send(result))
    .catch((err) => res.status(err.status).send(err.reason));
});

module.exports = postsRouter;
