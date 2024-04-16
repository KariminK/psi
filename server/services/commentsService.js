const getComments = (data, database) =>
  new Promise((resolve, reject) => {
    const { postId } = data;
    const sql = `SELECT * FROM komentarze WHERE postId = ${postId}`;
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

    if (!userId || !postId || !content) {
      reject({ status: 400, reason: "bad data providen" });
    } else {
      const sql = `INSERT INTO komentarze (id, userId, postId, content, create_date) VALUES (NULL, '${userId}', '${postId}', '${content}', NULL)`;
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
