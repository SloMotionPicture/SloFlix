import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import {
  Navbar,
  SearchBar,
  LeftSideBar,
  Content,
  Cart,
  Checkout,
  Signup,
  Login,
  Main
} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
      </Switch>
    </div>
  )
}

export default App
