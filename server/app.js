const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "psi",
});

app.use(cors([]));
app.use(express.json());

app.get("/posts", (req, res) => {
  DATABASE_CONN.query("SELECT * FROM posty", (err, rows) => {
    console.log("[REQUEST] [GET] /posts endpoint");
    if (err) {
      console.log("[ERROR] ", err);
      res.destroy(500);
    }
    res.send(rows);
  });
});
app.post("/posts", (req, res) => {
  console.log("[REQUEST] [POST] /posts endpoint");
  const { authorId, create_date, title, content } = req.body;

  if (authorId && create_date && title) {
    const sql = `INSERT INTO posty (id, userId, title, description, create_date, likes) VALUES 
      (
        NULL, 
        ${authorId}, 
        "${title}", 
        "${content ?? "..."}",
        "${create_date}", '0'
      )`;
    database.query(sql, (err) => {
      if (err) {
        console.log("[ERROR] ", err);
        res.status(500);
      } else {
        res.status(200);
      }
      res.send();
    });
  } else {
    res.status(404);
    res.send("bad data providen");
  }
});
app.put("/posts", (req, res) => {
  console.log("[REQUEST] [PUT] /posts endpoint");
  const { postId, likes } = req.body;
  if (postId && likes) {
    const sql = `UPDATE posty SET likes = ${likes} WHERE id = ${postId}`;
    database.query(sql, (err) => {
      if (err) {
        res.status(500);
      }
      res.send();
    });
  } else {
    res.status(304);
    res.send("Nothing changed");
  }
});

app.listen(3000, "localhost", () => {
  console.log("[START] SERVER LISTENING ON PORT 3000");
});
