import Card from "./card.js";
import Book from "./book.js";

export const library = [];

const modal = document.querySelector("dialog");
const form = document.getElementById("form");

const handleButtonClick = (event) => {
  const classList = event.target.classList;
  const index = event.target.getAttribute("data-index");
  const book = library[index];

  if (classList.contains("btn-new")) {
    handleInvalidFields();
    modal.showModal();
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;

      if (!form.checkValidity()) {
        handleInvalidFields();
        return;
      } else {
        const book = new Book(
          form.title.value,
          form.author.value,
          parseInt(form.pages.value),
          form.read.value === "read" ? true : false,
        );
        book.addToLibrary();
      }

      form.reset();
      modal.close();
      renderBookCards();
    });
  }

  if (classList.contains("btn-cancel")) {
    const button = document.querySelector(".btn-add");
    button.textContent = "Add Book";
    form.reset();
    modal.close();
  }

  if (classList.contains("btn-read")) {
    book.toggleRead();
  }

  if (classList.contains("btn-edit")) {
    form[0].value = book.title;
    form[1].value = book.author;
    form[2].value = book.pages;
    book.read === true ? (form[3].checked = true) : (form[4].checked = true);

    form.querySelector(".btn-add").textContent = "Update";
    modal.showModal();

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        handleInvalidFields();
        return;
      } else {
        book.title = event.target.title.value;
        book.author = event.target.author.value;
        book.pages = parseInt(event.target.pages.value);
        book.read = event.target.read.value === "read";
      }

      form.reset();
      modal.close();
      renderBookCards();
    });
  }

  if (classList.contains("btn-remove")) {
    book.remove(index);
  }

  renderBookCards();
};

const renderBookCards = () => {
  const grid = document.getElementById("bookGrid");
  grid.innerHTML = "";

  const message = document.createElement("p");
  message.textContent = "No books yet.";

  if (library.length === 0) {
    grid.appendChild(message);
  }

  library.forEach((book, index) => {
    let card = new Card(book, index);
    card.create();
  });
};

const handleInvalidFields = () => {
  Array.from(form.elements).forEach((i) => {
    !i.checkValidity()
      ? i.classList.add("invalid")
      : i.classList.remove("invalid");
    i.addEventListener("input", () => {
      i.classList.remove("invalid");
    });
  });
};

library.push(
  new Book("Lord of the Flies", "William Golding", 224, true),
  new Book("Dune", "Frank Herbert", 896, false),
);

renderBookCards();
document.addEventListener("click", handleButtonClick);
