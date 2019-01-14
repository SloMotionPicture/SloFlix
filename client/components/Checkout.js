import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {Navbar} from './index'
import {fetchMoviesInCart} from '../store/allMovies'

class Checkout extends Component {
  componentDidMount() {}
  render() {
    const {setAddress, verifyCard, verifiedCard, verifiedAddress} = this.props
    return verifiedCard && verifiedAddress ? (
      <Redirect path="/" />
    ) : (
      <div>
        <div>
          <h5>Checkout</h5>
          <hr />
          <div className="checkout_View">
            <form className="shipping" onSubmit={event => setAddress(event)}>
              <div>
                <input name="firstName" type="text" placeholder="First Name" />
                <input name="lastName" type="text" placeholder="Last Name" />
              </div>
              <input name="addressLine1" type="text" placeholder="Address" />
              <input
                name="addressLine2"
                type="text"
                placeholder="City, State ZIP"
              />
              <input name="phone" type="text" placeholder="Phone" />
              <button type="submit">Use this address</button>
            </form>
            <form className="card" onSubmit={event => verifyCard(event)}>
              <div>
                <input name="firstName" type="text" placeholder="First Name" />
                <input name="lastName" type="text" placeholder="Last Name" />
              </div>
              <input name="cardNum" type="text" placeholder="Address" />
              <input name="exp" type="text" placeholder="City, State ZIP" />
              <input name="cvc" type="text" placeholder="Phone" />

              <button type="submit">Use this card</button>
            </form>
          </div>
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
    verifiedAddress: !!state.user.address,
    verifiedCard: !!state.user.token,
    user: state.user,
    cart: state.allMovies.cart
  }
}

const mapDispatch = dispatch => {
  return {
    setAddress: event => {
      event.preventDefault()
      //format data
      dispatch(setUserAddress({}))
    },
    verifyCard: event => {
      event.preventDefault()
      //format card
      dispatch(verifyCard({}))
    }
  }
}

export default connect(mapState, mapDispatch)(Checkout)
