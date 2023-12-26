import Card from "./card.js";
import { library } from "./main.js";

export const renderBookCards = () => {
  const grid = document.getElementById("bookGrid");
  const message = document.createElement("p");
  message.textContent = "No books yet.";

  grid.innerHTML = "";

  if (library.length === 0) {
    grid.appendChild(message);
  }

  library.forEach((book, index) => {
    let card = new Card(book, index);
    card.create();
  });
};

export const createButton = (className, text, index) => {
  const button = document.createElement("button");
  button.setAttribute("data-index", index);
  button.className = className;
  button.textContent = text;
  return button;
};

export const handleButtonClick = (event) => {
  const target = event.target;
  const index = target.getAttribute("data-index");
  const book = library[index];

  if (target.classList.contains("btn-new")) {
    showNewBookModal();
  } else if (target.classList.contains("btn-cancel")) {
    cancelModal();
  } else if (target.classList.contains("btn-read")) {
    book.toggleRead();
  } else if (target.classList.contains("btn-edit")) {
    book.edit(index);
    resetInvalidFields();
  } else if (target.classList.contains("btn-remove")) {
    book.remove(index);
  }

  renderBookCards();
};

export const setInvalidFields = () => {
  const form = document.getElementById("form");
  Array.from(form.elements).forEach((i) => {
    if (!i.checkValidity()) {
      i.classList.add("invalid");
    } else {
      i.classList.remove("invalid");
    }
  });
};

const resetInvalidFields = () => {
  Array.from(form.elements).forEach((i) => {
    if (i.classList.contains("invalid")) {
      i.classList.remove("invalid");
    }
  });
};

const showNewBookModal = () => {
  const modal = document.querySelector("dialog");
  resetInvalidFields();
  modal.showModal();
};

const cancelModal = () => {
  const form = document.getElementById("form");
  const modal = document.querySelector("dialog");
  form.removeAttribute("data-editing");
  form.reset();
  modal.close();
};

export const populateForm = (index) => {
  const modal = document.querySelector("dialog");
  const form = document.getElementById("form");
  const book = library[index];

  form[0].value = book.title;
  form[1].value = book.author;
  form[2].value = book.pages;
  book.read === true ? (form[3].checked = true) : (form[4].checked = true);

  form.querySelector(".btn-add").textContent = "Update";
  form.setAttribute("data-editing", index);

  modal.showModal();
};
