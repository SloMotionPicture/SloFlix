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
    console.log('RENDERING', this.props)
    const {cart, checkout} = this.props
    return (
      <div>
        <Navbar />
        <div className="cart_View">
          <h3>Shopping Cart</h3>
          <Link to="/checkout">
            <h3>Checkout</h3>
          </Link>
          {cart ? (
            <div>
              {cart.map(movie => {
                return (
                  <div className="cart_Cell">
                    <img src={movie.imageUrl} />
                    <label>{movie.title}</label>
                  </div>
                )
              })}
            </div>
          ) : (
            <div />
          )}
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
    user: state.user,
    cart: state.allMovies.cart
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
