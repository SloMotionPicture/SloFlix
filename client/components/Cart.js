import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Navbar} from './index'
import {fetchMoviesInCart, removeFromCart} from '../store/allMovies'

class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    const {cart, checkout, isLoggedIn, removeFromCart} = this.props
    console.log('RENDER', cart)

    return (
      <div>
        <div className="cart_View">
          <h3>Shopping Cart</h3>
          {isLoggedIn ? (
            <Link to="/checkout">
              <h3>Checkout</h3>
            </Link>
          ) : (
            <Link to="/login">
              <h3>Checkout</h3>
            </Link>
          )}
          {cart && (
            <div>
              {cart.map((movie, index) => {
                return (
                  <div className="cart_Cell" key={movie.imageUrl}>
                    <img src={movie.imageUrl} />
                    <div className="div_1">
                      <label>
                        {movie.title} {movie.year}
                      </label>
                      <label>{movie.summary}</label>
                      <table>
                        <tbody>
                          <tr>
                            <th>Rent</th>
                            <th>Purchase</th>
                            <th>VHS</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="div_2">
                      <label>{`Total Price: $${movie.price / 100}`}</label>
                      <div
                        className="remove"
                        onClick={() => removeFromCart(index)}
                      >
                        <label>Remove</label>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  }
}

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
    },
    removeFromCart: cartIndex => dispatch(removeFromCart(cartIndex))
  }
}

export default connect(mapState, mapDispatch)(Cart)
