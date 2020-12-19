/* global Handlebars, dataSource */

{
  ('use strict');

  const select = {
    templateOf: {
      book: '#template-book',
    },
    container: {
      booksList: '.books-list',
      filters: '.filters',
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
  const filters = [];

  function initActions() {

    const allBooks = document.querySelector(select.container.booksList);
    const allFilters = document.querySelector(select.container.filters);

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
    });

    allFilters.addEventListener('click', function(event) {
      const clickedElement = event.target;

      if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter') {

        if(clickedElement.checked) {
          filters.push(clickedElement.value);

          console.log(clickedElement);

          filterBooks();

        } else {
          const indexOfFilters = filters.indexOf(clickedElement.value);
          const removedFilters = filters.splice(indexOfFilters, 1);

          console.log('removedFilters', removedFilters);
          console.log(filters);

          filterBooks();
        }
      }

    });

  }

  function filterBooks() {

    for(let book of dataSource.books) {

      let shouldBeHidden = false;

      for(let filter of filters) {

        if(!book.details[filter]) {
          shouldBeHidden = true;

          break;
        }
      }

      const hiddenBook = document.querySelector('.book__image[data-id="' + book.id + '"]');

      if(shouldBeHidden === true) {
        hiddenBook.classList.add('hidden');
      } else {
        hiddenBook.classList.remove('hidden');
      }
    }
  }

  initActions();
}
