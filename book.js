import { library } from "./main.js";
import { renderBookCards } from "./utils.js";

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  addToLibrary() {
    library.push(this);
    renderBookCards();
  }

  remove(index) {
    library.splice(index, 1);
  }

  toggleRead() {
    this.read = !this.read;
  }
}

export default Book;
