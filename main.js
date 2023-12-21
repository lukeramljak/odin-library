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

  if (form.checkValidity()) {
    const book = new Book(
      form.title.value,
      form.author.value,
      parseInt(form.pages.value),
      form.read.value === "read" ? true : false,
    );
    book.addToLibrary();

    form.reset();
    modal.close();
  } else {
    Array.from(form.elements).forEach((i) => {
      if (i.checkValidity()) {
        i.classList.remove("invalid");
      } else {
        i.classList.add("invalid");
      }
    });
  }
});
