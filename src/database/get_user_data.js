const db_connection = require('./../../build_database/db_connection.js');

const data = {};

data.getAllUsers = (cb) =>{
  db_connection.query('Select id, first_name, last_name FROM users', (err,res)=>{
    if(err) cb(new Error('Error getting data from database'));
    cb(null, res.rows);
  })
}


module.exports = data;
