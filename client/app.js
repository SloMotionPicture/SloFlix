import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import {
  Navbar,
  SearchBar,
  LeftSideBar,
  Content,
  Cart,
  Checkout
} from './components'
import Routes from './routes'
import DefaultComponent from './components/DefaultComponent'

const App = () => {
  return (
    <div>
      <Switch>
        {/* <Navbar />
      <SearchBar />
      <LeftSideBar />
    <Content /> */}
        <Route exact path="/signup" component={Routes} />
        <Route exact path="/login" component={Routes} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route path="/" component={DefaultComponent} />
      </Switch>
    </div>
  )
}

export default App
