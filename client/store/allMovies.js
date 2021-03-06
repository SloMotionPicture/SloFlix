import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_MOVIES = 'GET_MOVIES'
const GET_CART_MOVIES = 'GET_CART_MOVIES'
const GOT_MOVIES_WITH_TAG = 'GOT_MOVIES_WITH_TAG'
const GOT_MOVIES_FROM_SEARCH = 'GOT_MOVIES_FROM_SEARCH'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

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
export const gotMoviesFromSearch = movies => ({
  type: GOT_MOVIES_FROM_SEARCH,
  movies
})
export const removedItemFromCart = cart => ({type: REMOVE_FROM_CART, cart})
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
export const removeFromCart = cartIndex => async dispatch => {
  try {
    const response = await axios.delete(`/api/movies/cart/${cartIndex}`)
    if (response) {
      dispatch(removedItemFromCart(response.data))
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

export const fetchSearchMovies = (value, type) => async dispatch => {
  try {
    const response = await axios.get(`/api/movies/search/${value}/${type}`)
    const action = gotMoviesFromSearch(response.data)
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
      action.cart.map(obj => {
        const movie = state.allMovies[Number(obj.movieId)]
        cart.push({...movie, price: obj.price})
      })
      return {...state, cart}
    case GOT_MOVIES_WITH_TAG:
      return {...state, allMovies: action.movies}
    case GOT_MOVIES_FROM_SEARCH:
      return {...state, allMovies: action.movies}
    case REMOVE_FROM_CART:
      let newCart = []
      action.cart.map(obj => {
        const movie = state.allMovies[Number(obj.movieId)]
        newCart.push({...movie, price: obj.price})
      })
      return {
        ...state,
        allMovies: state.allMovies,
        cart: newCart
      }
    default:
      return state
  }
}
