import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {Navbar} from './index'
import {fetchMoviesInCart} from '../store/allMovies'
import {setUserAddress, verifyCardData} from '../store/user'
class Confirm extends Component {
  componentDidMount() {}
  render() {
    const {cart, user} = this.props
    const totalPrice = cart.map(movie => {})
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.allMovies.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm)
