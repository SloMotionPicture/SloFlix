import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import React, {Component} from 'react'
import {fetchOneMovie} from '../store/singleMovie'
import {LeftSideBar} from '../components'
import {addMovieToCart} from '../store/singleMovie'

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
    const toDollars = num => {
      let dollars = num / 100
      return dollars.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    }
    return movie ? (
      <div className="single_movie">
        <div className="single_flex">
          <div className="single_image">
            <img src={movie.imageUrl} />
            <p>User Rating: {movie.rating}</p>
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
            {movie.tags.map(tag => {
              return <p>{tag.name}</p>
            })}
          </div>
        </div>
        <div className="single_buttons">
          <button
            onClick={() => this.props.handleClick(movie.id - 1)}
            type="submit"
          >
            Digital - <span>{toDollars(movie.digitalPrice)}</span>
          </button>
          <button
            onClick={() => this.props.handleClick(movie.id - 1)}
            type="submit"
          >
            Rent - <span>{toDollars(movie.rentPrice)}</span>
          </button>
          <button
            onClick={() => this.props.handleClick(movie.id - 1)}
            type="submit"
          >
            VHS - <span>{toDollars(movie.physicalPrice)}</span>
          </button>
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
    },
    handleClick: movieId => addMovieToCart(movieId)
  }
}

export default connect(mapState, mapDispatch)(SingleMovie)
