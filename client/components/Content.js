import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {MovieView, AdView} from '../components'

const Content = () => {
  return (
    <div className="content">
      <MovieView />
      <AdView />
    </div>
  )
}

export default Content
