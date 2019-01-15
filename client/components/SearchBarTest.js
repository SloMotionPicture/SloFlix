import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {logout} from '../store/user'
import {fetchSearchMovies} from '../store/allMovies'

class SearchBar extends React.Component {
  constructor() {
    super()
    this.state = {
      searchValue: '',
      searchType: 'Title'
    }
    this.didSubmit = this.didSubmit.bind(this)
    this.didChange = this.didChange.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.typeChange = this.typeChange.bind(this)
    // this.handleLogout = this.handleLogout.bind(this)
  }
  isLoggedIn() {
    return !!this.props.user.email
  }
  didSubmit(event) {
    event.preventDefault()
    console.log(this.state.searchType)
    console.log(this.state.searchValue)
    this.props.handleSearch(this.state.searchValue, this.state.searchType)
  }
  didChange(event) {
    this.setState({
      searchValue: event.target.value
    })
  }
  typeChange(event) {
    this.setState({
      searchType: event.target.value
    })
  }
  render() {
    return (
      <div className="search_Bar">
        <form onSubmit={event => this.didSubmit(event)}>
          <input
            name="searchBy"
            type="text"
            placeholder="Search"
            onChange={event => this.didChange(event)}
          />
          <select
            value={this.state.searchType}
            onChange={event => this.typeChange(event)}
          >
            <option value="Title">Title</option>
            <option value="Actor">Actor</option>
          </select>
          <button type="submit">Submit</button>
        </form>
        {this.isLoggedIn() ? (
          <div>
            <Link
              className="view_Cart"
              to="/"
              onClick={this.props.handleLogout}
            >
              <h5>Logout</h5>
            </Link>
          </div>
        ) : (
          <div>
            <Link className="login" to="/login">
              <h5>Login/ SignUp</h5>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleLogout: () => dispatch(logout()),
    handleSearch: (value, type) => dispatch(fetchSearchMovies(value, type))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)

// SearchBar.propTypes = {
//handleLogout: PropTypes.func.isRequired
//isLoggedIn: PropTypes.bool.isRequired
// }
