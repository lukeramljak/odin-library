import { createButton } from "./utils.js";

class Card {
  constructor(book, index) {
    this.book = book;
    this.index = index;
  }

  create() {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-index", this.index);

    const contentDiv = document.createElement("div");
    contentDiv.className = "card-content";

    for (const prop in this.book) {
      const p = document.createElement("p");
      p.className = prop;
      if (prop === "read") {
        p.textContent = this.book[prop] ? "Read" : "Unread";
      } else {
        p.textContent = this.book[prop];
      }
      contentDiv.appendChild(p);
    }

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "card-buttons";

    const readButton = createButton(
      "btn-read",
      this.book.read === true ? "Mark Unread" : "Mark Read",
      this.index,
    );

    const editButton = createButton("btn-edit", "Edit", this.index);

    const removeButton = createButton("btn-remove", "Remove", this.index);

    buttonsDiv.append(readButton, editButton, removeButton);
    card.append(contentDiv, buttonsDiv);

    const grid = document.getElementById("bookGrid");
    grid.appendChild(card);
  }
}

export default Card;
