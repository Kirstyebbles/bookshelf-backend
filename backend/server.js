const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

let db;

try {
  db = require("./db");
  console.log("db.js loaded");
} catch (err) {
  console.log("DB FILE LOAD ERROR:", err);
}

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/setup", (req, res) => {
  if (!db) {
    return res.status(500).json({ error: "Database not connected" });
  }

  db.query(`
    CREATE TABLE IF NOT EXISTS books (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255),
      status VARCHAR(50) DEFAULT 'unread',
      progress INT DEFAULT 0
    )
  `, (err) => {
    if (err) {
      console.log("SETUP ERROR:", err);
      return res.status(500).json(err);
    }

    res.send("Books table created");
  });
});

app.get("/books", (req, res) => {
  if (!db) {
    return res.status(500).json({ error: "Database not connected" });
  }

  db.query("SELECT * FROM books", (err, results) => {
    if (err) {
      console.log("GET BOOKS ERROR:", err);
      return res.status(500).json(err);
    }

    res.json(results);
  });
});

app.post("/books", (req, res) => {
  if (!db) {
    return res.status(500).json({ error: "Database not connected" });
  }

  const { title, author } = req.body;

  db.query(
    "INSERT INTO books (title, author) VALUES (?, ?)",
    [title, author],
    (err) => {
      if (err) {
        console.log("ADD BOOK ERROR:", err);
        return res.status(500).json(err);
      }

      res.json({ message: "Book added" });
    }
  );
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port " + (process.env.PORT || 3000));
});
