//models

const db = require("../db/index.js");
const users = {};


users.allusers = (req, res, next) => {
  db.manyOrNone('SELECT * FROM users')
    .then(data => {
      res.locals.usersData = data;
      next();
    })
    .catch(err => {
      console.log('db error: ' + err);
      next(err);
    });
};

users.oneUser = (req, res, next) => {
  const id = req.params.id;
  db
    .one("SELECT * FROM users WHERE users.id = ${id}", { id: id })
    .then(data => {
      res.locals.userData = data;
      next();
    })
    .catch(error => {
      console.log("error encountered in users.oneusers. Error:", error);
      next(error);
    });
};

users.newUser = (req, res, next) => {
  db.one('INSERT INTO users (fname, lname, email, password, favorite_source) VALUES ($1, $2, $3, $4, $5) RETURNING id;',
    [
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.password,
        req.body.favorite_source
      ])
    .then(data => {
      res.locals.userData = data;
      next();
    })
    .catch(err => {
      console.log('db error: ' + err);
      next(err);
    });
};

module.exports = users;