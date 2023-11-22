const library = [
  {
    title: 'Lord of the Rings',
    author: 'J.R.R Tolkien',
    pages: 580,
    read: 'Yes',
  },
  {
    title: 'American Psycho',
    author: 'Some Woman',
    pages: 350,
    read: 'No',
  },
];

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
    removeBook(index);
    grid.removeChild(card);
  });

  grid.appendChild(card);
};

const removeBook = (index) => {
  library.splice(index, 1);
};

const updateBookList = () => {
  const grid = document.getElementById('bookGrid');
  grid.textContent = '';
  library.forEach((book, index) => {
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

updateBookList();
