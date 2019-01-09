import axios from 'axios'


/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS_BY_USER = 'GET_TRANSACTIONS_BY_USER'

/**
 * INITIAL STATE
 */
const defaultTransactionByUser = []

/**
 * ACTION CREATORS
 */
export const getTransactionsByUser = userTransactions => ({
  type: GET_TRANSACTIONS_BY_USER,
  userTransactions
})

/**
 * THUNK CREATORS
 */
export const fetchTransactionsByUser = userId => async dispatch => {
  try {
    const response = await axios.get(`/api/transactions/${userId}`)
    const action = getTransactionsByUser(response.data)
    dispatch(action)
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */

export default function(state = defaultTransactionByUser, action) {
  switch (action.type) {
    case GET_TRANSACTIONS_BY_USER:
      return defaultTransactionByUser
    default:
      return state
  }
}
