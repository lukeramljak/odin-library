const library = [];
const form = document.getElementById("form");

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
}

function addBookToLibrary() {
  const book = new Book(
    form.title.value,
    form.author.value,
    form.pages.value,
    form.read.value
  );
  library.push(book);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
  displayBooks();
  form.reset();
});
