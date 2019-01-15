import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Redirect, Switch} from 'react-router-dom'
import {Navbar} from './index'
import {fetchMoviesInCart} from '../store/allMovies'
import {setUserAddress, verifyCardData, placeOrder} from '../store/user'
class Confirm extends Component {
  componentDidMount() {}
  render() {
    const {cart, user, purchase, rent, placeOrder} = this.props
    let totalPrice = 0
    cart.map(obj => {
      totalPrice += Number(obj.price)
    })
    const displayPrice = '$' + totalPrice / 100
    return (
      <div>
        <h3>Confirm Order</h3>
        <div className="">
          <div className="info">
            <div>
              <h4>Shipping Address</h4>
            </div>
            <div>
              <h4>Card Details</h4>
            </div>
          </div>
          <div className="cart_Info">
            <div>
              <h4>Summary</h4>
              <h4>{`Total: ${displayPrice}`}</h4>
            </div>
            {cart.map(movie => {
              return <Cell movie={movie} rent={rent} purchase={purchase} />
            })}
          </div>
        </div>
        <div
          className="confirm"
          onClick={() => {
            let tempTransaction = {
              amount: totalPrice,
              description: '',
              source: user.token,
              metadata: {
                userId: user.id ? user.id : 0,
                movies: []
              },
              status: 'Pending'
            }
            cart.map(obj => {
              tempTransaction.metadata.movies.push(obj.id)
            })
            tempTransaction.metadata.movies = tempTransaction.metadata.movies.join(
              ','
            )
            placeOrder(tempTransaction)
          }}
        >
          Confirm Order
        </div>
      </div>
    )
  }
}

const Cell = ({movie, rent, purchase}) => {
  return (
    <div className="cell" key={movie.title}>
      <img src={movie.imageUrl} />
      <label>{movie.title}</label>
      <label>{movie.rating}</label>
      <div>
        <div className="cell_Button" onClick={rent}>
          Rent
        </div>
        <div className="cell_Button" onClick={purchase}>
          Purchase
        </div>
      </div>
      <label>{movie.price}</label>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.allMovies.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    rent: () => {},
    purchase: () => {},
    placeOrder: tempTransaction => {
      dispatch(placeOrder(tempTransaction))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm)
