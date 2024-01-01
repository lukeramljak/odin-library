import { library } from "./main.js";

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  addToLibrary() {
    library.push(this);
  }

  remove(index) {
    library.splice(index, 1);
  }

  toggleRead() {
    this.read = !this.read;
  }
}

export default Book;
