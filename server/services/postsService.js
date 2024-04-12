const getPosts = (database) =>
  new Promise((resolve, reject) => {
    database.query("SELECT * FROM posty", (err, rows) => {
      console.log("[REQUEST] [GET] /posts endpoint");
      if (err) {
        reject({ status: 404, reason: err });
      }
      resolve(rows);
    });
  });

const newPost = (data, database) =>
  new Promise((resolve, reject) => {
    const { authorId, create_date, title, content } = data;

    if (!authorId && !create_date && !title) {
      reject({ status: 400, reason: "bad data providen" });
    }
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
        reject({ status: 500, reason: err });
      }
      resolve({ status: 200 });
    });
  });

const updatePost = (data, database) =>
  new Promise((resolve, reject) => {
    const { postId, likes } = data;
    if (!postId && !likes) resolve({ status: 304, result: "nothing changed" });
    const sql = `UPDATE posty SET likes = ${likes} WHERE id = ${postId}`;
    database.query(sql, (err) => {
      if (err) {
        reject({ status: 500, reason: err });
      }
      resolve();
    });
  });
module.exports = {
  getPosts,
  newPost,
  updatePost,
};
