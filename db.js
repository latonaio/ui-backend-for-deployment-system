const express = require('express');
const app = express();
const mysql = require('promise-mysql');

// MySQLのコネクションプールを作成
const config = require('./config/db.json')[app.get('env')];
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "latona",
  password: process.env.MYSQL_PASSWORD || "Latona2019!",
  database: process.env.DB_NAME || "Deployment",
  port: process.env.MYSQL_PORT || 3306,
  timezone: 'Asia/Tokyo',
  connectionLimit: 10,
});

const getConnection = async function () {
  return pool.then(
    pool => pool.getConnection()
  ).catch(
    err => {
      console.log(err);
      throw err;
    }
  );
};

const releaseConnection = function (connection) {
  if (connection !== undefined) {
    pool.then(
      pool => pool.releaseConnection(connection)
    ).catch(
      err => console.log(err)
    );
  }
};

console.log("MySQL Connection Pool Created.");
module.exports = {poolPromise: pool, getConnection, releaseConnection};