import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import React, {Component} from 'react'
import {fetchOneMovie} from '../store/singleMovie'
import {LeftSideBar} from '../components'

class SingleMovie extends Component {
  render() {
    const {orderNumber} = this.props
    return (
      <div className="success_Screen">
        <div className="success">
          <label>Order Successful!</label>
        </div>
        <div className="order_Number">
          <label>{`Order Number: ${this.props.match.params.chargeId}`}</label>
        </div>
        <label>You will receive a confirmation email shortly</label>
      </div>
    )
  }
}

const mapState = state => {
  return {
    orderId: state.singleMovie
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleMovie: movieId => {
      dispatch(fetchOneMovie(movieId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleMovie)
