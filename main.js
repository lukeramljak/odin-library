import Book from "./book.js";
import { renderBookCards } from "./utils.js";

export const library = [];

library.push(
  new Book("Lord of the Flies", "William Golding", 224, true),
  new Book("Dune", "Frank Herbert", 896, false),
);

renderBookCards();
