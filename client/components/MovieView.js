import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {movieData} from '../../script/dummydata'
import {addMovieToCart} from '../store/singleMovie'
class MovieView extends Component {
  componentDidMount() {}
  render() {
    const {handleClick} = this.props
    console.log('RENDER')
    return (
      <div className="movie_View">
        <table>
          <tbody>
            {movieData.map(movie => {
              return (
                <tr onClick={() => handleClick(movie.id)}>
                  <img src={movie.imageUrl} />
                  <label>{movie.title} </label>
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
  return {}
}
const mapDispatchToProps = dispatch => {
  return {
    handleClick: movieId => addMovieToCart(movieId)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieView)
