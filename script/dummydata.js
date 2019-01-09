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
    tags: ['Drama', 'Mystery'],
    summary:
      'Following the death of a publishing tycoon, news reporters scramble to discover the meaning of his final utterance.',
    year: 1941,
    rating: '8.4',
    rentPrice: 2.99,
    digitalPrice: 11.99,
    physicalPrice: 14.99
  },
  {
    id: 2,
    title: 'Cool Hand Luke',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BOWFlNzZhYmYtYTI5YS00MDQyLWIyNTUtNTRjMWUwNTEzNjA0XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_UX182_CR0,0,182,268_AL_.jpg',
    cast: ['Paul Newman', 'George Kennedy', 'Strother Martin', 'J.D. Cannon'],
    tags: ['Drama', 'Crime'],
    summary:
      'A laid back Southern man is sentenced to two years in a rural prison, but refuses to conform.',
    year: 1967,
    rating: '8.1',
    rentPrice: 2.99,
    digitalPrice: 10.99,
    physicalPrice: 14.99
  },
  {
    id: 3,
    title: 'Big',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMDQ1ODM5MTMtMjAwYi00ZGUxLTliNTMtN2ZhODAwMjVhMTRlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UY268_CR0,0,182,268_AL_.jpg',
    cast: ['Tom Hanks', 'Elizabeth Perkins', 'Robert Loggia'],
    tags: ['Drama', 'Comedy', 'Family'],
    summary:
      'A laid back Southern man is sentenced to two years in a rural prison, but refuses to conform.',
    year: 1988,
    rating: '7.3',
    rentPrice: 3.99,
    digitalPrice: 13.99,
    physicalPrice: 17.99
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
    tags: ['Action', 'Sci-Fi', 'Thriller'],
    summary:
      'A wrongly convicted man must try to survive a public execution gauntlet staged as a game show.',
    year: 1987,
    rating: '6.7',
    rentPrice: 1.99,
    digitalPrice: 9.99,
    physicalPrice: 12.99
  },
  {
    id: 5,
    title: 'The Foot Fist Way',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMjA5Mzg0MjAxOF5BMl5BanBnXkFtZTcwODQzMTM2MQ@@._V1_UX182_CR0,0,182,268_AL_.jpg',
    cast: ['Danny McBride', 'Ben Best', 'Jody Hill', 'Collette Wolfe'],
    tags: ['Comedy'],
    summary:
      'An inept tae kwon do instructor struggles with marital troubles and an unhealthy obsession with fellow tae kwon do enthusiast Chuck "The Truck" Wallace.',
    year: 2006,
    rating: '6.4',
    rentPrice: 3.99,
    digitalPrice: 19.99,
    physicalPrice: 19.99
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
    date: '2019-01-03 04:05:02'
  },
  {
    userId: 3,
    stripeKey: 'RIEISO3ssssssssETT',
    movies: [2, 4, 5],
    date: '2016-05-09 09:05:02'
  },
  {
    userId: 4,
    stripeKey: 'RIEISO666392RREETT',
    movies: [1, 5],
    date: '2018-08-09 02:02:02'
  }
]

module.exports = {
  userData,
  movieData,
  tagData,
  transactionData
}
