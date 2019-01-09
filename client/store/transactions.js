import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

/**
 * INITIAL STATE
 */
const defaultTransactions = []

/**
 * ACTION CREATORS
 */
export const getTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions
})

/**
 * THUNK CREATORS
 */
export const fetchTransactions = async dispatch => {
  try {
    const response = await axios.get('/api/transactions')
    const action = getTransactions(response.data)
    dispatch(action)
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */

export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return defaultTransactions
    default:
      return state
  }
}
