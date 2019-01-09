import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleMovie from './singleMovie'
import allMovies from './allMovies'
import tags from './tags'
import transactions from './transactions'
import transactionsByUser from './transactionsByUser'

const reducer = combineReducers({
  user,
  singleMovie,
  allMovies,
  tags,
  transactions,
  transactionsByUser
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
