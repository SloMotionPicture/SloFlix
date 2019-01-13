import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {movieData} from '../../script/dummydata'
import {addMovieToCart} from '../store/singleMovie'
import {fetchMovies} from '../store/allMovies'
class MovieView extends Component {
  componentDidMount() {
    this.props.fetchMovies()
  }
  render() {
    const {handleClick, movies} = this.props
    console.log('RENDER', this.props)
    return (
      <div className="movie_View">
        <table>
          <tbody>
            {movies.map(movie => {
              console.log('URL', movie.imageUrl)
              return (
                <tr className="movie_Cell">
                  <Link to={`/movie/${movie.id}`}>
                    <img src={movie.imageUrl} />
                    <label>{movie.title} </label>
                  </Link>
                  <div onClick={() => handleClick(movie.id)}>
                    <h5>Add To Cart</h5>
                  </div>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    movies: state.allMovies
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: () => dispatch(fetchMovies()),
    handleClick: movieId => addMovieToCart(movieId)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieView)
