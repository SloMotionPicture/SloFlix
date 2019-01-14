import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {fetchTags} from '../store/tags'
import {fetchMoviesWithTag} from '../store/allMovies'

class LeftSideBar extends Component {
  componentDidMount() {
    this.props.fetchTags()
  }
  render() {
    const {tags, handleClick} = this.props
    return (
      <div className="left_Bar">
        <h2>Genres</h2>
        <table>
          <tbody>
            {tags.map(tag => (
              <tr key={tag.name}>
                <th>
                  <Link
                    to={`/${tag.name}`}
                    onClick={() => handleClick(tag.name)}
                  >
                    {tag.name}
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tags: state.tags
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchTags: () => dispatch(fetchTags()),
    handleClick: tag => dispatch(fetchMoviesWithTag(tag))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LeftSideBar)
