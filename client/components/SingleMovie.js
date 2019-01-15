import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import React, {Component} from 'react'
import {fetchOneMovie} from '../store/singleMovie'
import {LeftSideBar} from '../components'
class SingleMovie extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.fetchSingleMovie(this.props.match.params.movieId)
  }
  render() {
    const {movie} = this.props
    console.log(movie)
    return movie ? (
      <div className="single_movie">
        <div className="single_flex">
          <div className="single_image">
            <img src={movie.imageUrl} />
          </div>
          <div className="single_description">
            <h1>{movie.title}</h1>
            <p>{movie.summary}</p>
          </div>
        </div>
        <div className="single_tags">
          <div>
            <h4>Genres:</h4>
          </div>
          {/* Add foreach logic here for get assoc tags */}
          <div className="single_tag_flex">
            <p>Comedy</p>
            <p>Drama</p>
            <p>Mystery</p>
          </div>
        </div>
        <div className="single_buttons">
          <button type="submit">Digital</button>
          <button type="submit">Rent</button>
          <button type="submit">VHS</button>
        </div>
      </div>
    ) : (
      <div className="movie_View">
        <h1>No Data</h1>
      </div>
    )
  }
}
const mapState = state => {
  return {
    movie: state.singleMovie
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
