import axios from 'axios'
import history from '../history'
/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const VERIFIED_CARD = 'VERIFIED_CARD'
const VERIFIED_ADDRESS = 'VERIFIED_ADDRESS'
/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const verifiedCard = user => ({type: VERIFIED_CARD, user})
const verifiedAddress = user => ({type: VERIFIED_ADDRESS, user})
/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  email,
  password,
  method,
  firstName,
  lastName
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      firstName,
      lastName
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.delete('/auth/logout')
    dispatch(removeUser())
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}

export const setUserAddress = address => async dispatch => {
  try {
    console.log('INSIDE', address)
    const response = await axios.post('/api/users/address', address)
    console.log('RESPONSE', response)
    if (response) {
      dispatch(verifiedAddress(response.data))
    }
  } catch (err) {
    console.log(err)
  }
}
export const verifyCardData = card => async dispatch => {
  try {
    const response = await axios.post('/api/users/verifyCard', card)
    if (response) {
      dispatch(verifiedCard(response.data))
    }
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case VERIFIED_CARD:
      return {
        ...state,
        ...action.user
      }
    case VERIFIED_ADDRESS:
      console.log('STORE')
      return {
        ...state,
        ...action.user
      }
    default:
      return state
  }
}
