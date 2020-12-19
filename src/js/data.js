const dataSource = {}; // eslint-disable-line no-unused-vars

dataSource.books = [
  {
    id: 1,
    name: 'Lady in red',
    price: 20,
    rating: 8,
    ratingBgc: 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);',
    ratingWidth: 80,
    image: 'images/books/1.jpg',
    details: {
      adults: true,
      nonFiction: false
    }
  },
  {
    id: 2,
    name: 'JS Design Patterns',
    price: 15,
    rating: 9.2,
    ratingBgc: 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);',
    ratingWidth: 92,
    image: 'images/books/2.jpg',
    details: {
      adults: false,
      nonFiction: true
    }
  },
  {
    id: 3,
    name: 'Eloquent Javascript',
    image: 'images/books/3.jpg',
    price: 20,
    rating: 7.8,
    ratingBgc: 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);',
    ratingWidth: 78,
    details: {
      adults: false,
      nonFiction: true
    }
  },
  {
    id: 4,
    name: 'You don\'t know JS',
    image: 'images/books/4.jpg',
    price: 40,
    rating: 8.2,
    ratingBgc: 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);',
    ratingWidth: 82,
    details: {
      adults: false,
      nonFiction: true
    }
  },
  {
    id: 5,
    name: 'Of Mice and Men',
    image: 'images/books/5.jpg',
    rating: 6.4,
    ratingBgc: 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);',
    ratingWidth: 64,
    price: 40,
    details: {
      adults: false,
      nonFiction: false
    }
  },
];
