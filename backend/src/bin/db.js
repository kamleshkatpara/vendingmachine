/* eslint-disable no-console */
import chalk from 'chalk';

const mysql = require('mysql');

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;

// Database Configuration
const dbConn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
});

// Connecting the database
dbConn.connect((err) => {
  if (err) {
    console.log(error(`MySQL connection has occured ${err} error !!`));
    throw err;
  }

  console.log(
    connected('MySQL connection was successful :)'),
  );
});

module.exports = dbConn;
