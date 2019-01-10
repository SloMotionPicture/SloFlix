/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')

const User = db.model('users')
const Tag = db.model('tags')
const Movie = db.model('movies')
const Transaction = db.model('transactions')

const {tagData} = require('../../../script/dummydata')

////////////////User model tests///////////
describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  // erase after each test
  afterEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')

///////////////Tag model tests///////////////////////

describe('Tag model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  // erase after each test
  afterEach(() => {
    return db.sync({force: true})
  })

  describe('tag content', () => {
    let tag1
    let tag2
    let tag3

    beforeEach(async () => {
      tag1 = await Tag.create({
        name: 'Hello'
      })
      tag2 = await Tag.create(tagData[0])
      tag3 = await Tag.create(tagData[10])
    })

    it('we get the correct name for the tag tested', () => {
      expect(tag1.name).to.be.equal('Hello')
    })
    it('we get the correct name for the tag tested', () => {
      expect(tag2.name).to.be.equal('Drama')
    })
    it('we get the correct name for the tag tested', () => {
      expect(tag3.name).to.be.equal('Fantasy')
    })
  }) // end describe('tag content')
}) //end 'Tag model'
