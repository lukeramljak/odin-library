import Book from "./book.js";
import { renderBookCards, handleButtonClick } from "./utils.js";

const library = [];

library.push(
  new Book("Lord of the Flies", "William Golding", 224, true),
  new Book("Dune", "Frank Herbert", 896, false),
);

renderBookCards();

export { library };

document.addEventListener("click", handleButtonClick);

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const modal = document.querySelector("dialog");
  const form = event.currentTarget;
  const button = form.querySelector(".btn-add");

  if (!form.checkValidity()) {
    Array.from(form.elements).forEach((i) => {
      if (i.checkValidity()) {
        i.classList.remove("invalid");
      } else {
        i.classList.add("invalid");
      }
    });
  }

  if (form.checkValidity() && button.textContent === "Add Book") {
    const book = new Book(
      form.title.value,
      form.author.value,
      parseInt(form.pages.value),
      form.read.value === "read" ? true : false,
    );
    book.addToLibrary();

    form.reset();
    modal.close();
  } else if (form.checkValidity() && button.textContent === "Update") {
    const book = library[form.getAttribute("data-editing")];
    book.title = form.title.value;
    book.author = form.author.value;
    book.pages = parseInt(form.pages.value);
    book.read = form.read.value === "read" ? true : false;
    form.reset();
    modal.close();
    renderBookCards();
  }
});
