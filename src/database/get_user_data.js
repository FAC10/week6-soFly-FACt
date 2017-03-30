const db_connection = require('./../../build_database/db_connection.js');

const data = {};

data.getAllUsers = (cb) => {
  db_connection.query('SELECT id, first_name, last_name FROM users', (err,res)=>{
    if(err) cb(new Error('Error getting data from database'));
    cb(null, res.rows);
  });
};

data.getUser = (id, cb) => {
  db_connection.query(`SELECT * FROM users WHERE users.id = ${id}`, (err,res)=>{
    if(err) cb(new Error('Error getting data from database'));
    cb(null, res.rows[0]);
  });
};

data.addUser = (formvalues, cb) => {
  db_connection.query(`INSERT INTO users (${Object.keys(formvalues)[0]}) VALUES  formvalues[${Object.keys(formvalues)[0]}]`, (err, res)=>{
    if (err) cb(new Error('Error getting data from database'));
    cb(null, res.rows);
  });
};

module.exports = data;
