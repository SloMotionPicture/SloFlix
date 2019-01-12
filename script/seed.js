'use strict'

const db = require('../server/db')
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

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  console.log('starting to seed')

  for (const user of userData) {
    await User.create(user)
  }
  for (const movie of movieData) {
    await Movie.create(movie)
  }
  for (const tag of tagData) {
    await Tag.create(tag)
  }

  for (const transaction of transactionData) {
    await Transaction.create(transaction)
  }

  for (const movieTransaction of movieTransactionJoinData) {
    await MovieTransaction.create(movieTransaction)
  }

  const TagMovie = db.model('Tag-Movie-Join-Table')

  for (const tagmovie of TagMovieJoin) {
    await TagMovie.create(tagmovie)
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
