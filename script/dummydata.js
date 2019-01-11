// Dummy Data for testing front-end and future use for seed file

// USERS
const userData = [
  {
    id: 1,
    firstName: 'Zach',
    lastName: 'Hubbard',
    email: 'zach@someemail.com',
    password: '1234',
    phone: '805-867-5309',
    streetAddress: '1111 Pine St.',
    city: 'San Luis Obispo',
    state: 'CA',
    zipCode: '93405',
    adminStatus: true
  },
  {
    id: 2,
    firstName: 'Reza',
    lastName: 'Nahvi',
    email: 'reza@someemail.com',
    password: '1234',
    phone: '805-867-5309',
    streetAddress: '1111 Elm St.',
    city: 'San Luis Obispo',
    state: 'CA',
    zipCode: '93401',
    adminStatus: false
  },
  {
    id: 3,
    firstName: 'Bryan',
    lastName: 'Stevens',
    email: 'bryan@someemail.com',
    password: '1234',
    phone: '805-867-5309',
    streetAddress: '1111 Oak St.',
    city: 'Morro Bay',
    state: 'CA',
    zipCode: '93442',
    adminStatus: true
  },
  {
    id: 4,
    firstName: 'Scott',
    lastName: 'Anderson',
    email: 'scott@someemail.com',
    password: '1234',
    phone: '805-867-5309',
    streetAddress: '1111 Maple St.',
    city: 'Los Osos',
    state: 'CA',
    zipCode: '93412',
    adminStatus: false
  }
]

// MOVIES
const movieData = [
  {
    id: 1,
    title: 'Citizen Kane',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BYjBiOTYxZWItMzdiZi00NjlkLWIzZTYtYmFhZjhiMTljOTdkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg',
    cast: [
      'Orson Welles',
      'Joseph Cotten',
      'Dorothy Comingore',
      'Agnes Moorehead'
    ],
    summary:
      'Following the death of a publishing tycoon, news reporters scramble to discover the meaning of his final utterance.',
    year: 1941,
    rating: '8.4',
    rentPrice: 299,
    digitalPrice: 1199,
    physicalPrice: 1499
  },
  {
    id: 2,
    title: 'Cool Hand Luke',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BOWFlNzZhYmYtYTI5YS00MDQyLWIyNTUtNTRjMWUwNTEzNjA0XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_UX182_CR0,0,182,268_AL_.jpg',
    cast: ['Paul Newman', 'George Kennedy', 'Strother Martin', 'J.D. Cannon'],
    summary:
      'A laid back Southern man is sentenced to two years in a rural prison, but refuses to conform.',
    year: 1967,
    rating: '8.1',
    rentPrice: 299,
    digitalPrice: 1099,
    physicalPrice: 1499
  },
  {
    id: 3,
    title: 'Big',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMDQ1ODM5MTMtMjAwYi00ZGUxLTliNTMtN2ZhODAwMjVhMTRlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UY268_CR0,0,182,268_AL_.jpg',
    cast: ['Tom Hanks', 'Elizabeth Perkins', 'Robert Loggia'],
    summary:
      'A laid back Southern man is sentenced to two years in a rural prison, but refuses to conform.',
    year: 1988,
    rating: '7.3',
    rentPrice: 399,
    digitalPrice: 1399,
    physicalPrice: 1799
  },
  {
    id: 4,
    title: 'The Running Man',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMWU4NzA2OWYtNGQ0MS00YWNkLTg4M2YtZjlkZmY1YmJjMDE4XkEyXkFqcGdeQXVyNDc2NjEyMw@@._V1_UY268_CR1,0,182,268_AL_.jpg',
    cast: [
      'Arnold Schwarzenegger',
      'Maria Conchita Alonso',
      'Yaphet Kotto',
      'Richard Dawson'
    ],
    summary:
      'A wrongly convicted man must try to survive a public execution gauntlet staged as a game show.',
    year: 1987,
    rating: '6.7',
    rentPrice: 199,
    digitalPrice: 999,
    physicalPrice: 1299
  },
  {
    id: 5,
    title: 'The Foot Fist Way',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMjA5Mzg0MjAxOF5BMl5BanBnXkFtZTcwODQzMTM2MQ@@._V1_UX182_CR0,0,182,268_AL_.jpg',
    cast: ['Danny McBride', 'Ben Best', 'Jody Hill', 'Collette Wolfe'],
    summary:
      'An inept tae kwon do instructor struggles with marital troubles and an unhealthy obsession with fellow tae kwon do enthusiast Chuck "The Truck" Wallace.',
    year: 2006,
    rating: '6.4',
    rentPrice: 399,
    digitalPrice: 1999,
    physicalPrice: 1999
  }
]

const tagData = [
  {
    name: 'Drama'
  },
  {
    name: 'Comedy'
  },
  {
    name: 'Crime'
  },
  {
    name: 'Action'
  },
  {
    name: 'Sci-Fi'
  },
  {
    name: 'Thriller'
  },
  {
    name: 'Family'
  },
  {
    name: 'Mystery'
  },
  {
    name: 'Romance'
  },
  {
    name: 'Animation'
  },
  {
    name: 'Fantasy'
  }
]

const transactionData = [
  {
    userId: 1,
    stripeKey: 'RIEISO39392RREETT',
    movies: [1, 5],
    status: 'Pending'
  },
  {
    userId: 3,
    stripeKey: 'RIEISO3ssssssssETT',
    movies: [2, 4, 5],
    status: 'Fulfilled'
  },
  {
    userId: 4,
    stripeKey: 'RIEISO666392RREETT',
    movies: [1, 5],
    status: 'Closed'
  }
]

const TagMovieJoin = [
  {
    movieId: 1,
    tagId: 2
  },
  {
    movieId: 1,
    tagId: 6
  },
  {
    movieId: 2,
    tagId: 3
  },
  {
    movieId: 3,
    tagId: 4
  },
  {
    movieId: 4,
    tagId: 1
  },
  {
    movieId: 4,
    tagId: 2
  },
  {
    movieId: 5,
    tagId: 2
  },
  {
    movieId: 5,
    tagId: 3
  },
  {
    movieId: 5,
    tagId: 4
  },
  {
    movieId: 5,
    tagId: 5
  }
]

const movieTransactionJoinData = [
  {
    movieId: 1,
    transactionId: 1,
    price: 299,
    typeOfTransaction: 'Credit Card'
  }
]

module.exports = {
  userData,
  movieData,
  tagData,
  transactionData,
  TagMovieJoin,
  movieTransactionJoinData
}
