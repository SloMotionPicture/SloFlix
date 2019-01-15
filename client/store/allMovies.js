import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_MOVIES = 'GET_MOVIES'
const GET_CART_MOVIES = 'GET_CART_MOVIES'
const GOT_MOVIES_WITH_TAG = 'GOT_MOVIES_WITH_TAG'

/**
 * INITIAL STATE
 */
const defaultMovies = {
  allMovies: [],
  cart: []
}

/**
 * ACTION CREATORS
 */
export const gotMovies = movies => ({type: GET_MOVIES, movies})
export const gotMoviesInCart = cart => ({type: GET_CART_MOVIES, cart})
export const gotMoviesWithTag = movies => ({type: GOT_MOVIES_WITH_TAG, movies})
/**
 * THUNK CREATORS
 */
export const fetchMovies = () => async dispatch => {
  try {
    const response = await axios.get(`/api/movies`)
    const action = gotMovies(response.data)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const fetchMoviesInCart = () => async dispatch => {
  try {
    const response = await axios.get('/api/movies/cart')
    if (response) {
      dispatch(gotMoviesInCart(response.data.movies))
    }
  } catch (err) {
    console.log(err)
  }
}

export const fetchMoviesWithTag = tag => async dispatch => {
  try {
    const response = await axios.get(`/api/movies/tags/${tag}`)
    const action = gotMoviesWithTag(response.data)
    dispatch(action)
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultMovies, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {...state, allMovies: action.movies}
    case GET_CART_MOVIES:
      let cart = []
      action.cart.map(movieId => {
        const movie = state.allMovies[Number(movieId)]
        cart.push(movie)
      })
      return {...state, cart}
    case GOT_MOVIES_WITH_TAG:
      return {...state, allMovies: action.movies}
    default:
      return state
  }
}
