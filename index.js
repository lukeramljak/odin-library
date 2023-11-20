const library = [];

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

function addBookToGrid() {
  const latestIndex = library.length - 1;
  const card = document.createElement('div');
  const button = document.createElement('button');
  const grid = document.getElementById('bookGrid');

  card.className = 'card';
  card.setAttribute('data-index', latestIndex);
  card.innerText = library[latestIndex].title;

  button.className = 'btn-remove';
  button.setAttribute('data-index', latestIndex);
  button.innerText = 'Remove';

  card.appendChild(button);
  grid.appendChild(card);

  button.addEventListener('click', () => {
    const index = button.getAttribute('data-index');
    removeBook(index);
    grid.removeChild(card);
  });
}

function removeBook(index) {
  library.splice(index, 1);
}

document.getElementById('form').addEventListener('submit', (event) => {
  event.preventDefault();
  addBookToLibrary(event.currentTarget);
  addBookToGrid();
  event.currentTarget.reset();
});
