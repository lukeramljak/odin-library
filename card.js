class Card {
  constructor(book, index) {
    this.book = book;
    this.index = index;
  }

  create() {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-index", this.index);

    const contentDiv = this.createContent();
    const buttonsDiv = this.createButtons();

    card.append(contentDiv, buttonsDiv);

    const grid = document.getElementById("bookGrid");
    grid.appendChild(card);
  }

  createContent() {
    const contentDiv = document.createElement("div");
    contentDiv.className = "card-content";

    for (const prop in this.book) {
      const p = document.createElement("p");
      p.className = prop;
      p.textContent =
        prop === "read"
          ? this.book[prop]
            ? "Read"
            : "Unread"
          : this.book[prop];
      contentDiv.appendChild(p);
    }

    return contentDiv;
  }

  createButtons() {
    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "card-buttons";

    const readButton = this.createButton(
      "btn-read",
      this.book.read ? "Mark Unread" : "Mark Read",
    );
    const editButton = this.createButton("btn-edit", "Edit");
    const removeButton = this.createButton("btn-remove", "Remove");

    buttonsDiv.append(readButton, editButton, removeButton);

    return buttonsDiv;
  }

  createButton(className, text) {
    const button = document.createElement("button");
    button.setAttribute("data-index", this.index);
    button.className = className;
    button.textContent = text;
    return button;
  }
}

export default Card;
