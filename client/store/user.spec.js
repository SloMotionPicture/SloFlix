/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {me, logout} from './user'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'
import {movieData, tagData} from '../../script/dummydata'
import {getMovies} from './allMovies'
import {getSingleMovie} from './singleMovie'
import {getTags} from './tags'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  // Generate a random item
  function getRandomMovies(movies) {
    return movies[Math.floor(Math.random() * movies.length)]
  }

  function getRandomTags(tags) {
    return tags[Math.floor(Math.random() * tags.length)]
  }

  describe('Action creators', () => {
    describe('GetMovies', () => {
      it('returns a properly formatted action', () => {
        const film = getRandomMovies(movieData)

        expect(getMovies(film)).to.be.deep.equal({
          type: 'GET_MOVIES',
          movies: film
        })
      })
    })

    describe('GetSingleMovie', () => {
      it('returns a properly formatted action', () => {
        const film = getRandomMovies(movieData)

        expect(getSingleMovie(film)).to.be.deep.equal({
          type: 'GET_SINGLE_MOVIE',
          movie: film
        })
      })
    })

    describe('GetTags', () => {
      it('returns a properly formatted action', () => {
        const tag = getRandomTags(tagData)

        expect(getTags(tag)).to.be.deep.equal({
          type: 'GET_TAGS',
          tags: tag
        })
      })
    })
  })

  // describe('me', () => {
  //   it('eventually dispatches the GET USER action', async () => {
  //     const fakeUser = {email: 'Cody'}
  //     mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
  //     await store.dispatch(me())
  //     const actions = store.getActions()
  //     expect(actions[0].type).to.be.equal('GET_USER')
  //     expect(actions[0].user).to.be.deep.equal(fakeUser)
  //   })
  // })

  // describe('logout', () => {
  //   it('logout: eventually dispatches the REMOVE_USER action', async () => {
  //     mockAxios.onPost('/auth/logout').replyOnce(204)
  //     await store.dispatch(logout())
  //     const actions = store.getActions()
  //     expect(actions[0].type).to.be.equal('REMOVE_USER')
  //     expect(history.location.pathname).to.be.equal('/login')
  //   })
  // })
})
