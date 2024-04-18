const getComments = (data, database) =>
  new Promise((resolve, reject) => {
    const { postId } = data;
    const sql = `SELECT u.login, k.id, k.create_date, k.content FROM komentarze as k LEFT JOIN uzytkownicy as u ON k.userId = u.id WHERE postId = ${postId}`;
    if (!postId) reject({ status: 200, reason: "No post id specified" });
    else
      database.query(sql, (err, rows) => {
        if (err) reject({ status: 500, reason: err });
        else resolve(rows);
      });
  });

const newComment = (data, database) =>
  new Promise((resolve, reject) => {
    const { userId, postId, content } = data;
    const now = new Date();
    console.log(now.get);
    const date = `${now.getFullYear()}-${now.getMonth() + 1}-${
      now.getDate() < 10 ? "0" + now.getDate().toString() : now.getDate()
    }`;

    if (!userId || !postId || !content) {
      reject({ status: 400, reason: "bad data providen" });
    } else {
      const sql = `INSERT INTO komentarze (id, userId, postId, content, create_date) VALUES (NULL, '${userId}', '${postId}', '${content}', '${date}')`;
      database.query(sql, (err) => {
        if (err) reject({ status: 500, reason: err });
        resolve();
      });
    }
  });

module.exports = {
  getComments,
  newComment,
};
