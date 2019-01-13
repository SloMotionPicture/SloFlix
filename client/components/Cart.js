import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Navbar} from './index'
import {fetchMoviesInCart} from '../store/allMovies'
class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="cart_View">
          <h3>Shopping Cart</h3>
          <div />
        </div>
      </div>
    )
  }
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
  return {
    fetchCart: () => {
      dispatch(fetchMoviesInCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
