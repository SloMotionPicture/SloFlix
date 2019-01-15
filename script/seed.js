'use strict'

let baseURL =
  'https://www.imdb.com/list/ls057823854/?sort=list_order,asc&st_dt=&mode=detail&page='
const db = require('../server/db')
const scrape = require('./scraping')
const {
  User,
  Movie,
  Tag,
  Transaction,
  MovieTransaction
} = require('../server/db/models')
const {
  userData,
  movieData,
  tagData,
  transactionData,
  TagMovieJoin,
  movieTransactionJoinData
} = require('./dummydata')
const temp = [
  {
    title: 'The Master',
    year: '(2012)',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMTQ2NjQ5MzMwMF5BMl5BanBnXkFtZTcwMjczNTAzOA@@._V1_UY209_CR0,0,140,209_AL_.jpg',
    rating: '7.1',
    certificate: 'R',
    runtime: '138 min',
    tags: ['Drama'],
    summary:
      '    A Naval veteran arrives home from war unsettled and uncertain of his future - until he is tantalized by The Cause and its charismatic leader.',
    cast: [
      'Philip Seymour Hoffman',
      'Joaquin Phoenix',
      'Amy Adams',
      'Jesse Plemons'
    ],
    director: ['Paul Thomas Anderson']
  },
  {
    title: 'Men in Black 3',
    year: '(2012)',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMTU2NTYxODcwMF5BMl5BanBnXkFtZTcwNDk1NDY0Nw@@._V1_UY209_CR0,0,140,209_AL_.jpg',
    rating: '6.8',
    certificate: 'PG-13',
    runtime: '106 min',
    tags: ['Action', ' Adventure', ' Comedy'],
    summary:
      "    Agent J travels in time to M.I.B.'s early days in 1969 to stop an alien from assassinating his friend Agent K and changing history.",
    cast: ['Will Smith', 'Tommy Lee Jones', 'Josh Brolin', 'Jemaine Clement'],
    director: ['Barry Sonnenfeld']
  }
]
async function seed() {
  await db.sync({force: true})
  console.log('...db synced!...')

  console.log('...starting to seed...')
  let tags = {}
  const createStream = async page => {
    if (page !== 11) {
      console.log('...Starting Page ', page, '...')
      const url = baseURL + page
      const movies = await scrape(url)
      for (const movie of movies) {
        const newMovie = await Movie.create(movie)
        movie.tags.forEach(tag => {
          if (tag[0] === ' ') {
            tag = tag.slice(1, tag.length)
          }
          if (!tags[tag]) {
            tags[tag] = tag
          }
        })

        await Movie.create(movie)
      }
      console.group('...Finished page ', page, '...')
      await createStream(page + 1)
    }
  }
  await createStream(1)
  console.log('...retrieved movies...')

  for (const user of userData) {
    await User.create(user)
  }

  const TagMovie = db.model('Tag-Movie-Join-Table')

  for (const tag of Object.keys(tags)) {
    await Tag.create({name: tag})
  }

  for (const transaction of transactionData) {
    await Transaction.create(transaction)
  }

  for (const movieTransaction of movieTransactionJoinData) {
    await MovieTransaction.create(movieTransaction)
  }

  // const TagMovie = db.model('Tag-Movie-Join-Table')

  // for (const tagmovie of TagMovieJoin) {
  //   await TagMovie.create(tagmovie)
  // }

  console.log(`...seeded successfully...`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('...seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

//  Code that was featured in Boilermaker  -- not ready to abandon, yet

// const users = await Promise.all([
//   User.create({email: 'cody@email.com', password: '123'}),
//   User.create({email: 'murphy@email.com', password: '123'})
// ])

//console.log(`seeded ${users.length} users`)
