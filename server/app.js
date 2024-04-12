const express = require("express");
const cors = require("cors");
const postsRouter = require("./routes/posts");
const app = express();

app.use(cors([]));
app.use(express.json());
app.use("/posts", postsRouter);

app.listen(3000, "localhost", () => {
  console.log("[START] SERVER LISTENING ON PORT 3000");
});

class User {
  constructor(d1, d2, d3, d4) {
    this.name = d1;
    this.surname = d2;
    this.age = d3;
    this.job = d4;
  }
  wypiszImie() {
    console.log(this.name);
  }
}
