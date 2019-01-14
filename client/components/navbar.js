import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {me} from '../store/user'
class Navbar extends Component {
  componentDidMount() {
    this.props.getUser()
  }
  render() {
    const {handleClick, isLoggedIn, user} = this.props
    return (
      <div className="navBar">
        <Link to="/">
          <img src="./SloFlix_logo.png" />
        </Link>
        {isLoggedIn ? <h3>Logged In</h3> : <h3>Logged Out</h3>}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('MAPPED', state)
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
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

// /**
//  * PROP TYPES
//  */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
