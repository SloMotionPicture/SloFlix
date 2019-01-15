/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')

const User = db.model('users')
const Tag = db.model('tags')
const Movie = db.model('movies')

const {movieData, userData, tagData} = require('../../../script/dummydata')

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

    //We expect/want this to fail
    it('Validation test for the name of the tag tested', () => {
      expect(tag2.name).to.be.equal('ABC')
    })

    it('we get the correct name for the tag tested', () => {
      expect(tag3.name).to.be.equal('Fantasy')
    })
  }) // end describe('tag content')
}) //end 'Tag model'

//////User model tests//////

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
  })

  describe('user content', () => {
    let user1
    let user2
    let user3
    beforeEach(async () => {
      user1 = await User.create(userData[0])
      user2 = await User.create(userData[2])
      user3 = await User.create({
        firstName: 'Adam',
        lastName: 'Smith',
        email: 'smith@someemail.com',
        password: '1234',
        phone: '805-123-4567',
        streetAddress: '1 Main St.',
        city: 'San Luis Obispo',
        state: 'CA',
        zipCode: '93401'
      })
    })

    it('we get the correct field values for the user tested', () => {
      expect(user1.phone).to.be.equal('805-867-5309')
      expect(user1.lastName).to.be.equal('Hubbard')
    })

    it('we get the correct field values for the user tested', () => {
      expect(user2.firstName).to.be.equal('Bryan')
      expect(user2.email).to.be.equal('bryan@someemail.com')
    })
    it('If a field is missing for a user, (when appropriate) the default value is created', () => {
      expect(user3.adminStatus).to.be.equal(false)
    })
  }) // end describe('user content')
}) //end 'User model'

///////////////Movie model tests///////////////////////

describe('Movie model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  // erase after each test
  afterEach(() => {
    return db.sync({force: true})
  })

  describe('movie content', () => {
    let movie1
    let movie2
    let movie3

    beforeEach(async () => {
      movie1 = await Movie.create(movieData[0])
      movie2 = await Movie.create(movieData[1])
      movie3 = await Movie.create(movieData[2])
    })

    it('we get the correct value for the movie field tested', () => {
      expect(movie1.title).to.be.equal('Citizen Kane')
    })

    it('we get the correct value for the movie field tested', () => {
      expect(movie2.rating).to.be.equal('8.1')
    })

    it('we get the correct value for the movie field tested', () => {
      expect(movie3.cast).to.have.length(3)
    })
  }) // end describe('movie content')
}) //end 'Movie model'
