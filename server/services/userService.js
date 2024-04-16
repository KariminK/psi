const login = (data, database, bcrypt) => {
  return new Promise((resolve, reject) => {
    const { login, password } = data;
    const sql = `SELECT * FROM uzytkownicy WHERE login = "${login}"`;
    database.query(sql, (err, rows) => {
      if (err) {
        reject({
          status: 500,
          reason: err,
        });
        return;
      }
      if (rows.length === 0) {
        reject({
          status: 200,
          reason: {
            loggedIn: false,
            reason: "Invalid username",
          },
        });
        return;
      }
      const user = rows[0];
      if (bcrypt.compareSync(password, user.password))
        resolve({ loggedIn: true, userId: user.id ?? null });
      else
        reject({
          status: 200,
          reason: {
            loggedIn: false,
            reason: "Invalid password",
          },
        });
    });
  });
};
const register = (data, database, bcrypt) => {
  return new Promise((resolve, reject) => {
    const { login, password } = data;
    const sql = `SELECT * FROM uzytkownicy WHERE login = "${login}"`;
    database.query(sql, (err, rows) => {
      if (err) reject({ status: 500, reason: err });
      if (rows.length != 0) {
        reject({
          status: 202,
          reason: {
            registeredIn: false,
            reason: "username is already taken!",
          },
        });
        return;
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const sql2 = `INSERT INTO uzytkownicy (id, login, password, create_date) VALUES (NULL, "${login}", "${hashedPassword}", NULL)`;
        database.query(sql2, (err, rows) => {
          console.log(rows);
          if (err) {
            reject({ status: 500, reason: err });
            return;
          }
          resolve({
            registered: true,
            userId: rows.insertId,
          });
        });
      }
    });
  });
};

module.exports = {
  login,
  register,
};
