/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('..')
const User = db.model('users')
const Movie = db.model('movies')
const Transaction = db.model('transactions')
const Tag = db.model('tags')
const {
  userData,
  movieData,
  tagData,
  transactionData
} = require('../../script/dummydata')
//-----------------USER---------------------
describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    beforeEach(() => {
      userData.map(user => {
        User.create(user)
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(userData[0].email)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

//-----------------Movies---------------------
describe('Movie routes', () => {
  beforeEach(() => {
    db.sync({force: true})
  })

  beforeEach(() => {
    movieData.map(movie => {
      Movie.create(movie)
    })
  })

  it('GET /api/movies', async () => {
    const res = await request(app)
      .get('/api/movies')
      .expect(200)

    expect(res.body).to.be.an('array')
    expect(res.body[0].title).to.be.equal(movieData[0].title)
    expect(res.body[0].year).to.be.equal(movieData[0].year)
  }) // end describe('/api/movies')
}) // end describe('Movie routes')

//-----------------Tags---------------------
describe('Tags routes', () => {
  beforeEach(() => {
    db.sync({force: true})
  })

  beforeEach(() => {
    tagData.map(tag => {
      Tag.create(tag)
    })
  })

  it('GET /api/tags', async () => {
    const res = await request(app)
      .get('/api/tags')
      .expect(200)

    expect(res.body).to.be.an('array')
    expect(res.body[0].name).to.be.equal('Action')
  }) // end describe('/api/tags')
}) // end describe('Tag routes')

// //-----------------Transactions---------------------
// describe('Transactions routes', () => {
//   beforeEach(() => {
//     db.sync({force: true})
//   })

//   // describe('/api/transactions/', () => {
//   //   const nowDate = new Date.now()
//   //   const transactionObj = {
//   //     stripeKey: 'randomstringofchars',
//   //     movies: ['Avengers', 'Batman Returns', 'Batman Begins'],
//   //     date: nowDate
//   //   }

//   beforeEach(() => {
//     const createdTransactions = transactionData.map(transaction => {
//       Transaction.create(transaction)
//     })
//     return createdTransactions
//   })

//   it('GET /api/transactions', async () => {
//     const res = await request(app)
//       .get('/api/transactions')
//       .expect(200)

//     expect(res.body).to.be.an('array')
//     expect(res.body[0].movies).to.be.at.least(1)
//     expect(res.body[0].date).to.be.an.instanceof(Date)
//     expect(res.body[0]).to.be.an.instanceof(Transaction)
//   })
//   //}) // end describe('/api/transactions')
// }) // end describe('Transaction routes')
