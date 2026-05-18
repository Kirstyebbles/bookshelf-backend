async function addBook() {
  console.log("BUTTON CLICKED");

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;

  const res = await fetch("https://YOUR-RENDER-URL.onrender.com/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, author })
  });

  const data = await res.json();

  console.log(data);
}