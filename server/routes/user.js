const express = require("express");
const userRouter = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const { login, register } = require("../services/userService");

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "psi",
});

userRouter.post("/login", (req, res) => {
  login(req.body, database, bcrypt)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err.reason);
    });
});
userRouter.post("/register", (req, res) => {
  register(req.body, database, bcrypt)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err.reason);
    });
});

module.exports = userRouter;
