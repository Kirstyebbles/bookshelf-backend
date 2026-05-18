const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/setup", (req, res) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS books (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255),
      status VARCHAR(50) DEFAULT 'unread',
      progress INT DEFAULT 0
    )
  `;

  db.query(sql, (err) => {
    if (err) {
      console.log("SETUP ERROR:", err);
      return res.status(500).json({
        error: true,
        code: err.code || null,
        errno: err.errno || null,
        message: err.message || null,
        sqlMessage: err.sqlMessage || null
      });
    }

    res.send("Books table created");
  });
});

app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
    if (err) {
      console.log("GET BOOKS ERROR:", err);
      return res.status(500).json({
        error: true,
        code: err.code || null,
        message: err.message || null,
        sqlMessage: err.sqlMessage || null
      });
    }

    res.json(results);
  });
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;

  db.query(
    "INSERT INTO books (title, author) VALUES (?, ?)",
    [title, author],
    (err) => {
      if (err) {
        console.log("ADD BOOK ERROR:", err);
        return res.status(500).json({
          error: true,
          code: err.code || null,
          message: err.message || null,
          sqlMessage: err.sqlMessage || null
        });
      }

      res.json({ message: "Book added" });
    }
  );
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port " + (process.env.PORT || 3000));
});
