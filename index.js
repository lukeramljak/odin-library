const library = [
  {
    title: 'Book',
    author: 'Author',
    pages: 100,
    read: 'Yes',
  },
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
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

  const contentDiv = document.createElement('div');
  contentDiv.className = 'card-content';

  for (const prop in book) {
    if (book.hasOwnProperty(prop)) {
      const p = document.createElement('p');
      const span = document.createElement('span');
      p.textContent = `${prop.charAt(0).toUpperCase() + prop.slice(1)}: `;
      span.textContent = `${book[prop]}`;
      span.className = 'book-item';

      p.appendChild(span);
      contentDiv.appendChild(p);
    }
  }

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'card-buttons';

  const readButton = createButton('Toggle', 'btn-read', index);
  const removeButton = createButton('Remove', 'btn-remove', index);

  buttonsDiv.appendChild(readButton);
  buttonsDiv.appendChild(removeButton);

  card.appendChild(contentDiv);
  card.appendChild(buttonsDiv);

  grid.appendChild(card);
};

const createButton = (text, className, index) => {
  const button = document.createElement('button');
  button.className = className;
  button.setAttribute('data-index', index);
  button.textContent = text;
  return button;
};

const handleButtonClick = (event) => {
  const target = event.target;
  const index = target.getAttribute('data-index');

  if (target.classList.contains('btn-remove')) {
    library.splice(index, 1);
  } else if (target.classList.contains('btn-read')) {
    const book = library[index];
    book.read = book.read === 'Yes' ? 'No' : 'Yes';
  }
  updateBookList();
};

const updateBookList = () => {
  const grid = document.getElementById('bookGrid');
  const message = document.createElement('p');

  grid.textContent = '';

  if (library.length === 0) {
    grid.appendChild(message);
    message.textContent = 'No books yet.';
  } else {
    library.forEach((book, index) => {
      createCard(book, index);
    });
  }
};

document.getElementById('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  addBookToLibrary(form);
  updateBookList();
  form.reset();
});

document
  .getElementById('bookGrid')
  .addEventListener('click', handleButtonClick);

updateBookList();
