const login = (data, database, bcrypt) => {
  return new Promise((resolve, reject) => {
    const { login, password } = data;
    const sql = `SELECT * FROM uzytkownicy WHERE login = "${login}"`;
    database.query(sql, (err, rows, fields) => {
      if (err) {
        reject({
          status: 500,
          reason: err,
        });
      }
      if (rows.length === 0) {
        reject({
          status: 404,
          reason: "User not found",
        });
      }
      const user = rows[0];
      if (bcrypt.compareSync(password, user.password)) resolve("logged in");
      else
        reject({
          status: 200,
          reason: "Invalid password",
        });
    });
  });
};
const register = (data, database, bcrypt) => {
  return new Promise((resolve, reject) => {
    const { login, password } = data;
    const sql = `SELECT * FROM uzytkownicy WHERE login = "${login}"`;
    database.query(sql, (err, rows, fields) => {
      if (err) reject({ status: 500, reason: err });
      if (rows.length != 0)
        reject({ status: 202, reason: "username is already taken!" });
      else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const sql2 = `INSERT INTO uzytkownicy (id, login, password, create_date) VALUES (NULL, "${login}", "${hashedPassword}", NULL)`;
        database.query(sql2, (err, rows, fields) => {
          if (err) reject({ status: 500, reason: err });
          resolve("user registered successfully");
        });
      }
    });
  });
};

module.exports = {
  login,
  register,
};
