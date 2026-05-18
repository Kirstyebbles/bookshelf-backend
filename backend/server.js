const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   MYSQL CONNECTION
========================= */

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    console.log("MySQL Connected");
  }
});

/* =========================
   TEST ROUTE
========================= */

app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* =========================
   GET BOOKS
========================= */

app.get("/books", (req, res) => {

  db.query(
    "SELECT * FROM books",
    (err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.json(results);
    }
  );
});

/* =========================
   ADD BOOK
========================= */

app.post("/books", (req, res) => {

  const { title, author } = req.body;

  db.query(
    "INSERT INTO books (title, author) VALUES (?, ?)",
    [title, author],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.json({
        message: "Book added"
      });
    }
  );
});

/* =========================
   SERVER
========================= */

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});