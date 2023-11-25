const library = [
  {
    title: 'Book',
    author: 'Author',
    pages: 100,
    read: 'Yes',
  },
  {
    title: 'Book',
    author: 'Author',
    pages: 100,
    read: 'Yes',
  },
];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
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

      p.appendChild(span);
      contentDiv.appendChild(p);
    }
  }

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'card-buttons';

  const readButton = createButton('btn-read', index, book);
  const editButton = createButton('btn-edit', index, book);
  const removeButton = createButton('btn-remove', index, book);

  buttonsDiv.append(readButton, editButton, removeButton);
  card.append(contentDiv, buttonsDiv);

  grid.appendChild(card);
};

const createButton = (className, index, book) => {
  const button = document.createElement('button');
  button.setAttribute('data-index', index);
  button.className = className;

  switch (book.read) {
    case 'Yes':
      button.textContent = 'Mark Unread';
      break;
    case 'No':
      button.textContent = 'Mark Read';
      break;
    default:
      button.textContent = 'Toggle';
      break;
  }

  if (button.classList.contains('btn-remove')) {
    button.textContent = 'Remove';
  } else if (button.classList.contains('btn-edit')) {
    button.textContent = 'Edit';
  }

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
  } else if (target.classList.contains('btn-edit')) {
    // TODO: add edit dialogue
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

document.getElementById('newBook').addEventListener('click', () => {
  const modal = document.querySelector('dialog');
  modal.showModal();
});

// TODO: add behaviour to cancel button

document.getElementById('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const modal = document.querySelector('dialog');
  const form = event.currentTarget;
  addBookToLibrary(form);
  updateBookList();
  form.reset();
  modal.close();
});

document
  .getElementById('bookGrid')
  .addEventListener('click', handleButtonClick);

updateBookList();
