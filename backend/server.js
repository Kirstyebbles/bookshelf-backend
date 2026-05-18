/* =========================
   SETUP ROUTE
========================= */

app.get("/setup", (req, res) => {

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


/* =========================
   START SERVER
========================= */

app.listen(process.env.PORT || 3000, () => {
  console.log(
    "Server running on port " + (process.env.PORT || 3000)
  );
});
