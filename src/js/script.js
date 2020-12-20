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

  class BooksList {
    constructor() {
      const thisBookList = this;

      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initActions();

    }

    initData() {
      const thisBookList = this;

      thisBookList.data = dataSource.books;
    }

    getElements() {
      const thisBookList = this;

      thisBookList.allBooks = document.querySelector(select.container.booksList);
      thisBookList.allFilters = document.querySelector(select.container.filters);
      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
    }

    render() {
      const thisBookList = this;

      for (const data of dataSource.books) {
        data.ratingBgc = thisBookList.determineRatingBgc(data.rating);
        data.ratingWidth = thisBookList.ratingWidth(data.rating);
        const generatedHTML = templates.book(data);
        const generateDOM = utils.createDOMFromHTML(generatedHTML);
        containers.booksList.appendChild(generateDOM);
      }
    }

    initActions() {
      const thisBookList = this;

      thisBookList.allBooks.addEventListener('dblclick', function (event) {
        event.preventDefault();

        const clickedElement = event.target;

        if (clickedElement.classList.contains('book__image')) {

          const id = clickedElement.getAttribute('data-id');

          if (!clickedElement.classList.contains(classNames.favoriteBooks)) {

            // add class favorite to clicked element
            clickedElement.classList.add(classNames.favoriteBooks);

            // add id to favoriteBooks
            thisBookList.favoriteBooks.push(id);

          } else {
            const indexOfBooks = thisBookList.favoriteBooks.indexOf(id);
            const removedFavoriteBooks = thisBookList.favoriteBooks.splice(indexOfBooks, 1);

            console.log('removedFavoriteBooks', removedFavoriteBooks);

            clickedElement.classList.remove(classNames.favoriteBooks);
          }
        }
      });

      thisBookList.allFilters.addEventListener('click', function (event) {
        const clickedElement = event.target;

        if (clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter') {

          if (clickedElement.checked) {
            thisBookList.filters.push(clickedElement.value);

            console.log(clickedElement);

            thisBookList.filterBooks();

          } else {
            const indexOfFilters = thisBookList.filters.indexOf(clickedElement.value);
            const removedFilters = thisBookList.filters.splice(indexOfFilters, 1);

            console.log('removedFilters', removedFilters);
            console.log(thisBookList.filters);

            thisBookList.filterBooks();
          }
        }

      });

    }

    filterBooks() {
      const thisBookList = this;

      for (let book of dataSource.books) {

        let shouldBeHidden = false;

        for (let filter of thisBookList.filters) {

          if (!book.details[filter]) {
            shouldBeHidden = true;

            break;
          }
        }

        const hiddenBook = document.querySelector('.book__image[data-id="' + book.id + '"]');

        if (shouldBeHidden === true) {
          hiddenBook.classList.add('hidden');
        } else {
          hiddenBook.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {

      let bgc = '';

      if (rating < 6) {
        bgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      }

      if (rating > 6 && rating <= 8) {
        bgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      }

      if (rating > 8 && rating <= 9) {
        bgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      }

      if (rating > 9) {
        bgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }

      return bgc;
    }

    ratingWidth(rating) {

      let width = '';

      if (rating > 0 && rating < 100) {
        width = rating * 10;
      }

      return width;
    }
  }

  const app = new BooksList();

  app.init;
}


