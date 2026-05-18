const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false
  }
});

db.getConnection((err, connection) => {
  if (err) {
    console.log("DB CONNECTION ERROR CODE:", err.code);
    console.log("DB CONNECTION ERROR MESSAGE:", err.message);
  } else {
    console.log("MySQL pool connected");
    connection.release();
  }
});

module.exports = db;
