import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Navbar} from './index'

const Cart = () => {
  console.log('INSIDE')
  return (
    <div className="cart">
      <Navbar />
      <h3>Shopping Cart</h3>
      <div />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Cart)
