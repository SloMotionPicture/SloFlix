import React from 'react'
import SearchBar from './SearchBarTest'
import {LeftSideBar, MovieView, SingleMovie} from './index'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
const DefaultComponent = () => {
  return (
    <div className="default">
      <SearchBar />
      <LeftSideBar />
      <Switch>
        <Route exact path="/" component={MovieView} />
        <Route exact path="/movie/one/:movieId" component={SingleMovie} />
        <Route exact path="/:tag" component={MovieView} />
      </Switch>
    </div>
  )
}

export default DefaultComponent
