import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {MovieView, AdView, SingleMovie} from '../components'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
const Content = () => {
  return (
    <div className="content">
      <Switch>
        <Route exact path="/" component={MovieView} />
        <Route path="/movie/:movieId" component={SingleMovie} />
      </Switch>
      <AdView />
    </div>
  )
}

export default Content
