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
        <div>
          <img src={movie.imageUrl} />
          <h1>{movie.title}</h1>
          <p>{movie.summary}</p>
        </div>
        <div>
          <h3>Genres</h3>
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
