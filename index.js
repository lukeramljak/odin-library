const library = [
  {
    title: 'Book1',
    author: 'Author',
    pages: 100,
    read: 'Yes',
  },
  {
    title: 'Book2',
    author: 'Author',
    pages: 100,
    read: 'No',
  },
];

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
}

function addBookToLibrary(form) {
  const book = new Book(
    form.title.value,
    form.author.value,
    form.pages.value,
    form.read.value
  );
  library.push(book);
}

function createBookCard(book, index) {
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('data-index', index);
  card.innerHTML = `
  Title: ${book.title} 
  <br>
  Author: ${book.author}
  <br>
  Pages: ${book.pages}
  <br>
  Read: ${book.read}
  `;
  return card;
}

function createRemoveButton(index, card, grid) {
  const button = document.createElement('button');
  button.className = 'btn-remove';
  button.setAttribute('data-index', index);
  button.innerText = 'Remove';

  button.addEventListener('click', () => {
    const index = button.getAttribute('data-index');
    removeBook(index);
    grid.removeChild(card);
  });
  return button;
}

function addBookToGrid(book, index) {
  const grid = document.getElementById('bookGrid');
  const card = createBookCard(book, index);
  const button = createRemoveButton(index, card, grid);

  grid.appendChild(card);
  card.appendChild(button);
}

function removeBook(index) {
  library.splice(index, 1);
}

document.getElementById('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  addBookToLibrary(form);
  addBookToGrid(library[library.length - 1], library.length - 1);
  form.reset();
});

addBookToGrid(library[0]);
addBookToGrid(library[1]);
