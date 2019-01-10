import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_MOVIES = 'GET_MOVIES'

/**
 * INITIAL STATE
 */
const defaultMovies = []

/**
 * ACTION CREATORS
 */
export const getMovies = movies => ({type: GET_MOVIES, movies})

/**
 * THUNK CREATORS
 */
export const fetchMovies = () => async dispatch => {
  try {
    const response = await axios.get(`/api/movies`)
    const action = getMovies(response.data)
    dispatch(action)
  } catch (err) {
    // OB/MS: good that you are thinking about error handling, go further and report errors to the end user, maybe make a "toast" notification, like with this library: https://tomchentw.github.io/react-toastr/
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultMovies, action) {
  switch (action.type) {
    case GET_MOVIES:
      return action.movies
    default:
      return state
  }
}
