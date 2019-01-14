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
    const {allMovies} = movies
    console.log('RENDER', this.props)
    return (
      <div className="movie_View">
        <table>
          <tbody>
            {allMovies.map(movie => {
              return (
                <tr>
                  <th className="movie_Cell" key={movie.title}>
                    <Link to={`/movie/one/${movie.id}`}>
                      <img src={movie.imageUrl} />
                      <label>{movie.title} </label>
                    </Link>
                    <div onClick={() => handleClick(movie.id - 1)}>
                      <h5>Add To Cart</h5>
                    </div>
                  </th>
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
