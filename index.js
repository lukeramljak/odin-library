const library = [];

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
}

const addBookToLibrary = (form) => {
  const book = new Book(
    form.title.value,
    form.author.value,
    form.pages.value,
    form.read.value
  );
  library.push(book);
};

const createCard = (book, index) => {
  const grid = document.getElementById('bookGrid');
  const card = document.createElement('div');

  card.className = 'card';
  card.setAttribute('data-index', index);
  card.textContent = `${book.title} by ${book.author}, ${book.pages} pages.`;

  const button = document.createElement('button');
  button.className = 'btn-remove';
  button.setAttribute('data-index', index);
  button.textContent = 'Remove';

  card.appendChild(button);

  button.addEventListener('click', () => {
    const index = button.getAttribute('data-index');
    library.splice(index, 1);
    updateBookList();
  });

  grid.appendChild(card);
};

const updateBookList = () => {
  const grid = document.getElementById('bookGrid');
  const message = document.createElement('p');
  grid.textContent = '';
  if (library.length === 0) {
    grid.appendChild(message);
    message.textContent = 'No books yet.';
  }
  library.forEach((book, index) => {
    message.textContent = '';
    createCard(book, index);
  });
};

document.getElementById('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  addBookToLibrary(form);
  updateBookList();
  form.reset();
});
