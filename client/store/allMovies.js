import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_MOVIES = 'GET_MOVIES'
const GET_CART_MOVIES = 'GET_CART_MOVIES'
/**
 * INITIAL STATE
 */
const defaultMovies = []

/**
 * ACTION CREATORS
 */
export const gotMovies = movies => ({type: GET_MOVIES, movies})
export const gotMoviesInCart = movies => ({type: GET_CART_MOVIES, movies})
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
    const response = await axios.post('/api/movies/cart')
    if (response) {
      dispatch(gotMoviesInCart(response.data))
    }
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultMovies, action) {
  switch (action.type) {
    case GET_MOVIES:
      return action.movies
    case GET_CART_MOVIES:
      return action.movies
    default:
      return state
  }
}
