import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {movieData} from '../../script/dummydata'
import {addMovieToCart} from '../store/singleMovie'
import {fetchMovies, fetchMoviesWithTag} from '../store/allMovies'

class MovieView extends Component {
  componentDidMount() {
    if (this.props.match.params.tag) {
      this.props.fetchMoviesWithTag(this.props.match.params.tag)
    } else {
      this.props.fetchMovies()
    }
  }
  render() {
    const {handleClick, data} = this.props
    const {allMovies} = data
    return (
      <div className="movie_View">
        <table>
          <tbody>
            {allMovies.map(movie => (
              <MovieCell
                movie={movie}
                handleClick={handleClick}
                key={movie.imageUrl}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
const MovieCell = ({movie, handleClick}) => {
  return (
    <tr>
      <th className="movie_Cell">
        <Link to={`/movie/one/${movie.id}`}>
          <img src={movie.imageUrl} />
          <label>{movie.title} </label>
        </Link>
        <div
          onClick={() =>
            handleClick({price: movie.rentPrice, movieId: movie.id - 1})
          }
        >
          <h5>Rent</h5>
        </div>
      </th>
    </tr>
  )
}
const mapStateToProps = state => {
  return {
    data: state.allMovies
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: () => dispatch(fetchMovies()),
    handleClick: cartObj => addMovieToCart(cartObj),
    fetchMoviesWithTag: tag => dispatch(fetchMoviesWithTag(tag))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieView)
