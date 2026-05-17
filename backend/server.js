app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});

const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* ========================
   GET ALL BOOKS
======================== */
app.get("/books", (req, res) => {
  db.query("SELECT * FROM books ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

/* ========================
   ADD BOOK
======================== */
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  db.query(
    "INSERT INTO books (title, author) VALUES (?, ?)",
    [title, author],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Book added" });
    }
  );
});

/* ========================
   UPDATE PROGRESS
======================== */
app.put("/books/:id", (req, res) => {
  const { progress, status } = req.body;

  db.query(
    "UPDATE books SET progress = ?, status = ? WHERE id = ?",
    [progress, status, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Book updated" });
    }
  );
});

/* ========================
   DELETE BOOK
======================== */
app.delete("/books/:id", (req, res) => {
  db.query(
    "DELETE FROM books WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Book deleted" });
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});