const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

const DATABASE_CONN = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "psi",
});

app.use(cors({}));
app.use(express.json());

app.get("/posts", (req, res) => {
  DATABASE_CONN.connect((err) => {
    if (err) {
      console.log("[ERROR] ", err);
      res.destroy(500);
    }
  });
  DATABASE_CONN.query("SELECT * FROM posty", (err, rows, fields) => {
    if (err) {
      console.log("[ERROR] ", err);
      res.destroy(500);
    }
  });
});

app.listen(3000, "localhost", () => {
  console.log("[START] SERVER LISTENING ON PORT 3000");
});
