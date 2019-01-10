import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_MOVIE = 'GET_SINGLE_MOVIE'
/**
 * INITIAL STATE
 */
const defaultSingleMovie = {}

/**
 * ACTION CREATORS
 */
export const getSingleMovie = movie => ({type: GET_SINGLE_MOVIE, movie})

/**
 * THUNK CREATORS
 */
export const fetchOneMovie = id => async dispatch => {
  try {
    const response = await axios.get(`/api/movies/${id}`)
    const action = getSingleMovie(response.data)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}
export const addMovieToCart = async movieId => {
  try {
    const response = await axios.post(`/api/movies/addToCart/${movieId}`)
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultSingleMovie, action) {
  switch (action.type) {
    case GET_SINGLE_MOVIE:
      return action.movie
    default:
      return state
  }
}
