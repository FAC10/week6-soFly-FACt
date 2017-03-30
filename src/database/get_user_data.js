const db_connection = require('./../../build_database/db_connection.js');

const data = {};

data.getAllUsers = (cb) => {
  db_connection.query('SELECT id, first_name, last_name FROM users', (err,res)=>{
    if(err) cb(new Error('Error getting data from database'));
    cb(null, res.rows);
  });
};

data.getUser = (id, cb) => {
  db_connection.query(`SELECT first_name, middle_name, last_name, github_user_name FROM users WHERE users.id = ${id}`, (err,res)=>{
    if(err) cb(new Error('Error getting data from database'));
    cb(null, res.rows[0]);
  });
}

module.exports = data;
