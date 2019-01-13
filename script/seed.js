'use strict'

const db = require('../server/db')
const {User, Movie, Tag, Transaction} = require('../server/db/models')
const {userData, movieData, tagData, transactionData} = require('./dummydata')
const scrape = require('./scraping')
const example = {
  title: 'Pulp Fiction',
  year: '(1994)',
  imageUrl:
    'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/large/film-184890147._CB470041630_.png',
  rating: '8.9',
  certificate: 'R',
  runtime: '154 min',
  tags: ['Crime', ' Drama'],
  summary:
    "    The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson', 'Bruce Willis'],
  director: ['Quentin Tarantino']
}
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  console.log('starting to seed')
  const movies = await scrape()
  console.log('retrieved movies')

  for (const movie of movies) {
    await Movie.create(movie)
  }
  for (const user of userData) {
    await User.create(user)
  }
  // for (const movie of movieData) {
  //   await Movie.create(movie)
  // }
  for (const tag of tagData) {
    await Tag.create(tag)
  }
  for (const transaction of transactionData) {
    await Transaction.create(transaction)
  }

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
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
