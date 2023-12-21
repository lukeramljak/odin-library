import { library } from "./main.js";
import Card from "./card.js";

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
  } else if (target.classList.contains("btn-remove")) {
    book.remove(index);
  }

  renderBookCards();
};

const showNewBookModal = () => {
  const modal = document.querySelector("dialog");
  const form = document.getElementById("form");

  Array.from(form.elements).forEach((i) => {
    if (i.classList.contains("invalid")) {
      i.classList.remove("invalid");
    }
  });

  modal.showModal();
};

const cancelModal = () => {
  const form = document.getElementById("form");
  const modal = document.querySelector("dialog");
  form.reset();
  modal.close();
};
