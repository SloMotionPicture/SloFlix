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
  Main,
  SingleMovie,
  Confirm,
  Success

} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/movie/one/:movieId" component={Main} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />

        <Route exact path="/checkout/confirm" component={Confirm} />
        <Route exact path="/checkout/success/:chargeId" component={Success} />

        <Route path="/" component={Main} />
      </Switch>
    </div>
  )
}

export default App
