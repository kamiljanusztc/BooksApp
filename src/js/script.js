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
    favoriteBooks: 'favorite',
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
      book.addEventListener('dblclick', function(event) {
        event.preventDefault();

        // get book id from data-id
        const id = event.target.getAttribute('data-id');

        if(!book.classList.contains(classNames.favoriteBooks)) {
          // add class favorite to clicked element
          book.classList.add(classNames.favoriteBooks);

          // add id to favoriteBooks
          favoriteBooks.push(id);

        } else {
          const indexOfBooks = favoriteBooks.indexOf(id);
          const removedFavoriteBooks = favoriteBooks.splice(indexOfBooks, 1);

          console.log('removedFavoriteBooks', removedFavoriteBooks);

          book.classList.remove(classNames.favoriteBooks);
        }

        console.log(favoriteBooks);
      });
    }
  }

  initActions();
}
