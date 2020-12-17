/* global Handlebars, dataSource */

{
  ('use strict');

  const select = {
    templateOf: {
      book: '#template-book',
    },
    container: {
      booksList: '.books-list',
    },
  };

  const classNames = {
    bookImage: '.book__image',
  };

  const templates = {
    book: Handlebars.compile(
      document.querySelector(select.templateOf.book).innerHTML
    ),
  };

  const containers = {
    booksList: document.querySelector(
      select.container.booksList),
  };

  function render() {
    for(const data of dataSource.books) {
      const generatedHTML = templates.book(data);
      const generateDOM = utils.createDOMFromHTML(generatedHTML);
      containers.booksList.appendChild(generateDOM);
    }
  }

  render();

  const favoriteBooks = [];

  function initActions() {

    // add reference to all elements .book__image in .booksList
    const allElements = containers.booksList.querySelectorAll(classNames.bookImage);

    for(let book of allElements) {
      book.addEventListener('dblclick', function() {
        event.preventDefault();

        // add class favorite to clicked element
        book.classList.add(classNames.bookImage);

        // get book id from data-id
        const bookId = document.getElementById('data-id');

        // add id to favoriteBooks
        favoriteBooks.push(bookId);

      });
    }
  }

}











