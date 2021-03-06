import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {me} from '../store/user'
import {fetchMovies} from '../store/allMovies'

class Navbar extends Component {
  componentDidMount() {
    this.props.getUser()
  }
  render() {
    const {handleClick, isLoggedIn, user, reloadAllMovies} = this.props
    return (
      <div className="navBar">
        <Link to="/" onClick={reloadAllMovies}>
          <img src="/SloFlix_logo.png" />
        </Link>
        <table>
          <tbody className="nav_Options">
            <tr>
              <th>
                <Link className="view_Cart" to="/cart">
                  View Cart
                </Link>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    handleClick() {
      dispatch(logout())
    },
    reloadAllMovies() {
      dispatch(fetchMovies())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
