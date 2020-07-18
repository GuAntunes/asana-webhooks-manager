'use strict';
const mysql = require('mysql');
const database = require('./database');

//local mysql db connection
const dbConn = mysql.createConnection(database);

dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;