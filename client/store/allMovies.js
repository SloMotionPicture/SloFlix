import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_MOVIES = 'GET_MOVIES'
const GET_CART_MOVIES = 'GET_CART_MOVIES'

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
      console.log(response)
      dispatch(gotMoviesInCart(response.data.movies))
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
      return {...state, allMovies: action.movies}
    case GET_CART_MOVIES:
      let cart = []
      action.cart.map(movieId => {
        const movie = state.allMovies[Number(movieId)]
        console.log(movie)
        cart.push(movie)
      })
      return {...state, cart}
    default:
      return state
  }
}
