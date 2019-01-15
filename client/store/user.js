import axios from 'axios'
import history from '../history'
/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const VERIFIED_CARD = 'VERIFIED_CARD'
const VERIFIED_ADDRESS = 'VERIFIED_ADDRESS'
const CLEAR_TOKEN = 'CLEAR_TOKEN'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const verifiedCard = token => ({type: VERIFIED_CARD, token})
const verifiedAddress = address => ({type: VERIFIED_ADDRESS, address})
const clearToken = () => ({type: CLEAR_TOKEN})
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
    window.location.reload()
  } catch (err) {
    console.error(err)
  }
}

export const setUserAddress = address => async dispatch => {
  try {
    dispatch(verifiedAddress(address))

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

export const placeOrder = tempTransaction => async dispatch => {
  try {
    console.log('...Submitting Transaction...')
    const response = await axios.post(
      '/api/transactions/create',
      tempTransaction
    )
    if (response) {
      dispatch(clearToken())
      history.push(`/checkout/success/${response.data.stripeKey}`)
      window.location.reload()
    }
  } catch (err) {}
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
        token: action.token
      }
    case VERIFIED_ADDRESS:
      return {
        ...state,
        ...action.address
      }
    case CLEAR_TOKEN:
      state.token = null
      return {
        ...state
      }
    default:
      return state
  }
}
