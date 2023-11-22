// Book Manager

const allBooksList = document.getElementById('allBooksList');
const addBookBtn = document.getElementById('addBookBtn');
const searchBtn = document.getElementById('searchBtn');

let books = [];

// Function to add a book
function addBook(title, author, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newBook = { title, author };
      books.push(newBook);
      resolve(newBook);
      if (callback && typeof callback === 'function') {
        callback();
      }
    }, 1000);
  });
}

// Function to display all books
function displayAllBooks() {
  allBooksList.innerHTML = '';
  books.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `${book.title} by ${book.author}`;
    allBooksList.appendChild(li);
  });
}

// Function to search books by title
function searchBookByTitle(title) {
  const foundBooks = books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
  return Promise.resolve(foundBooks);
}

// Add Book button click event
addBookBtn.addEventListener('click', () => {
  const bookTitle = document.getElementById('bookTitle').value;
  const bookAuthor = document.getElementById('bookAuthor').value;

  addBook(bookTitle, bookAuthor, displayAllBooks)
    .then(() => {
      displayAllBooks();
    });

  document.getElementById('bookTitle').value = '';
  document.getElementById('bookAuthor').value = '';
});

// Search Button click event
searchBtn.addEventListener('click', () => {
  const searchInput = document.getElementById('searchInput').value;
  searchBookByTitle(searchInput)
    .then(foundBooks => {
      allBooksList.innerHTML = '';
      foundBooks.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author}`;
        allBooksList.appendChild(li);
      });
    });

  document.getElementById('searchInput').value = '';
});
