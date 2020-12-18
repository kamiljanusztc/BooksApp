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

    const allBooks = document.querySelector(select.container.booksList);

    allBooks.addEventListener('dblclick', function(event) {
      event.preventDefault();

      const clickedElement = event.target;

      if(clickedElement.classList.contains('book__image')) {

        const id = clickedElement.getAttribute('data-id');

        if(!clickedElement.classList.contains(classNames.favoriteBooks)) {

          // add class favorite to clicked element
          clickedElement.classList.add(classNames.favoriteBooks);

          // add id to favoriteBooks
          favoriteBooks.push(id);

        } else {
          const indexOfBooks = favoriteBooks.indexOf(id);
          const removedFavoriteBooks = favoriteBooks.splice(indexOfBooks, 1);

          console.log('removedFavoriteBooks', removedFavoriteBooks);

          clickedElement.classList.remove(classNames.favoriteBooks);
        }

      }

      console.log(favoriteBooks);
    });

  }

  initActions();
}
