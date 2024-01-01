import Book from "./book.js";
import {
  handleButtonClick,
  renderBookCards,
  setInvalidFields,
} from "./utils.js";
import { library } from "./main.js";

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const modal = document.querySelector("dialog");
  const form = event.currentTarget;
  const button = form.querySelector(".btn-add");

  if (!form.checkValidity()) {
    setInvalidFields();
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

document.addEventListener("click", handleButtonClick);
