const express = require("express");
const cors = require("cors");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const app = express();

app.use(cors([]));
app.use(express.json());
app.use("/posts", postsRouter);
app.use("/user", userRouter);

app.listen(3000, "localhost", () => {
  console.log("[START] SERVER LISTENING ON PORT 3000");
});
