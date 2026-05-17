const API = "http://localhost:3000/books";

async function loadBooks() {
  const res = await fetch(API);
  const data = await res.json();

  document.getElementById("list").innerHTML = data.map(book => `
    <div class="book">
      <b>${book.title}</b> by ${book.author || "Unknown"}
      <br>
      Status: ${book.status}
      <br>
      Progress: ${book.progress}%

      <div class="actions">
        <button onclick="markReading(${book.id})">Reading</button>
        <button onclick="markCompleted(${book.id})">Completed</button>
        <button onclick="deleteBook(${book.id})">Delete</button>
      </div>
    </div>
  `).join("");
}

async function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author })
  });

  loadBooks();
}

async function deleteBook(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadBooks();
}

async function markReading(id) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ progress: 30, status: "reading" })
  });

  loadBooks();
}

async function markCompleted(id) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ progress: 100, status: "completed" })
  });

  loadBooks();
}

loadBooks();