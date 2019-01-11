import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Axios from 'axios'
import {logout} from '../store/user'

const SearchBar = ({didChange, didSubmit, handleLogout, isLoggedIn}) => (
  <div className="search_Bar">
    <form onSubmit={didSubmit}>
      <input
        type="text"
        placeholder="Search"
        onChange={event => didChange(event)}
      />
      <select>
        <option value="Title">Title</option>
        <option value="Director">Director</option>
        <option value="Actor">Actor</option>
        <option value="Genre">Genre</option>
      </select>
    </form>
    {isLoggedIn ? (
      <div>
        <Link to="/" onClick={handleLogout}>
          {' '}
          Logout{' '}
        </Link>
      </div>
    ) : (
      <div>
        <Link className="login" to="/login">
          Login
        </Link>
        <Link className="signUp" to="/signup">
          Sign Up
        </Link>
      </div>
    )}
  </div>
)
const mapStateToProps = state => {
  return {
    searchValue: '',
    user: state.user,
    isLoggedIn: !!state.user.email,
    didChange: event => {
      searchValue = event.target.value
    }
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleLogout: () => dispatch(logout())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)

SearchBar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
