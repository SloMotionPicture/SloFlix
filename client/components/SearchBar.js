import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const SearchBar = ({didChange, didSubmit, handleClick, isLoggedIn}) => (
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
        {/* The navbar will show these links after you log in */}
        <Link to="/home">Home</Link>
        <a href="#" onClick={handleClick}>
          Logout
        </a>
      </div>
    ) : (
      <div>
        {/* The navbar will show these links before you log in */}
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

export default SearchBar

SearchBar.propTypes = {
  searchValue: '',
  didChange: event => {
    this.searchValue = event.target.value
  },
  didSubmit: () => {},
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
