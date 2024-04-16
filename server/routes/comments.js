const express = require("express");
const commentsRouter = express.Router();
const mysql = require("mysql");
const { getComments, newComment } = require("../services/commentsService");
const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "psi",
});
commentsRouter.get("/", (req, res) => {
  getComments(req.query, database)
    .then((comments) => res.send(comments))
    .catch((err) => res.status(err.status).send(err.reason));
});
commentsRouter.post("/", (req, res) => {
  newComment(req.body, database)
    .then((result) => res.send(result))
    .catch((err) => res.status(err.status).send(err.reason));
});

module.exports = commentsRouter;
