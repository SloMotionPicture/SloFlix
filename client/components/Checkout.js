import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {Navbar} from './index'
import {fetchMoviesInCart} from '../store/allMovies'
import {setUserAddress, verifyCardData} from '../store/user'
class Checkout extends Component {
  componentDidMount() {}
  render() {
    const {setAddress, verifyCard, verifiedCard, verifiedAddress} = this.props
    return verifiedCard && verifiedAddress ? (
      <Redirect to="/checkout/confirm" />
    ) : (

      <div>
        <div>
          <h5>Checkout</h5>
          {verifiedCard && verifiedAddress ? (
            <Link className="next" to="/checkout/confirm">
              <div>Next</div>
            </Link>
          ) : (
            <div />
          )}
          <hr />
          <div className="checkout_View">
            <ShippingForm setAddress={setAddress} />
            <CardForm verifyCard={verifyCard} />
          </div>
        </div>
      </div>
    )
  }
}

const ShippingForm = ({setAddress}) => {
  return (
    <form className="shipping" onSubmit={event => setAddress(event)}>
      <div>
        <input name="firstName" type="text" placeholder="First Name" />
        <input name="lastName" type="text" placeholder="Last Name" />
      </div>
      <input name="streetAddress" type="text" placeholder="Address" />
      <input name="city" type="text" placeholder="City" />
      <input name="state" type="text" placeholder="State" />
      <input name="zipCode" type="text" placeholder="ZIP" />
      <input name="phone" type="text" placeholder="Phone" />
      <button type="submit">Use this address</button>
    </form>
  )
}
const CardForm = ({verifyCard}) => {
  return (
    <form className="card" onSubmit={event => verifyCard(event)}>
      <div>
        <input name="firstName" type="text" placeholder="First Name" />
        <input name="lastName" type="text" placeholder="Last Name" />
      </div>
      <input name="cardNum" type="text" placeholder="Card Number" />
      <input name="exp" type="text" placeholder="Expiration (MM/YYYY)" />
      <input name="cvc" type="text" placeholder="CVC" />

      <button type="submit">Use this card</button>
    </form>
  )
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    verifiedAddress: !!state.user.streetAddress,
    verifiedCard: !!state.user.token,
    user: state.user,
    cart: state.allMovies.cart
  }
}

const mapDispatch = dispatch => {
  return {
    setAddress: event => {
      event.preventDefault()
      const {
        firstName,
        lastName,
        streetAddress,
        city,
        state,
        zipCode,
        phone
      } = event.target
      dispatch(
        setUserAddress({
          firstName: firstName.value,
          lastName: lastName.value,
          streetAddress: streetAddress.value,
          city: city.value,
          state: state.value,
          zipCode: zipCode.value,
          phone: phone.value
        })
      )
    },
    verifyCard: event => {
      event.preventDefault()
      //format card
      const {cardNum, exp, cvc} = event.target
      const splitExp = exp.value.split('/')
      dispatch(
        verifyCardData({
          number: cardNum.value,
          exp_month: splitExp[0],
          exp_year: splitExp[1],
          cvc: cvc.value
        })
      )
    }
  }
}

export default connect(mapState, mapDispatch)(Checkout)
