import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_MOVIE = 'GET_SINGLE_MOVIE'
const GOT_MOVIES_WITH_TAG = 'GOT_MOVIES_WITH_TAG'
/**
 * INITIAL STATE
 */
const defaultSingleMovie = {
  tags: []
}

/**
 * ACTION CREATORS
 */
export const getSingleMovie = movie => ({type: GET_SINGLE_MOVIE, movie})

/**
 * THUNK CREATORS
 */
export const fetchOneMovie = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/movies/one/${id}`)
      const action = getSingleMovie(response.data)
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
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
