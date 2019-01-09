import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_TAGS = 'GET_TAGS'

/**
 * INITIAL STATE
 */
const defaultTags = []

/**
 * ACTION CREATORS
 */
const getTags = tags => ({
  type: GET_TAGS,
  tags
})

/**
 * THUNK CREATORS
 */
export const fetchTags = async dispatch => {
  try {
    const response = await axios.get('/api/tags')
    const action = getTags(response.data)
    dispatch(action)
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */

export default function(state = defaultTags, action) {
  switch (action.type) {
    case GET_TAGS:
      return action.tags
    default:
      return state
  }
}
