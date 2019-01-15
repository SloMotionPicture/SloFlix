/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('..')
const {User, Movie, Transaction, Tag} = require('../db/models')
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
      expect(res.body[0].email).to.be.a('string')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

//-----------------Movies---------------------
describe('Movie routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  beforeEach(() => {
    movieData.map(movie => {
      // OB/MS: async issue below, could use `Promise.all`
      Movie.create(movie)
    })
  })
  it('GET /api/movies', async () => {
    const res = await request(app)
      .get('/api/movies')
      .expect(200)
    expect(res.body).to.be.an('array')
    // OB/MS: could test that the properties are equal to certain values, or do a `.find` to look for a certain movie in the array
    expect(res.body[0].title).to.be.a('string')
    expect(res.body[0].year).to.be.above(1920)
  }) // end describe('/api/movies')
}) // end describe('Movie routes')

//-----------------Tags---------------------
describe('Tags routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
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
    expect(res.body[0].name).to.be.a('string')
  }) // end describe('/api/tags')
}) // end describe('Tag routes')

//-----------------Transactions---------------------
describe('Transactions routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  beforeEach(() => {
    const singleTransaction = {
      stripeKey: 'RIEISO39392RREETT',
      movies: [1, 5],
      date: '2019-01-03 04:05:02'
    }
    // OB/MS: missing `await`
    Transaction.create(singleTransaction)
  })

  it('GET /api/transactions', async () => {
    const res = await request(app)
      .get('/api/transactions')
      .expect(200)
    expect(res.body).to.be.an('array')
  })
}) // end describe('Transaction routes')
