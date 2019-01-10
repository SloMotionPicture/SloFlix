import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {movieData} from '../../script/dummydata'

class MovieView extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}
  render() {
    console.log('RENDER')
    return (
      <div className="movie_View">
        <table>
          <tbody>
            {movieData.map(movie => {
              return (
                <tr>
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
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieView)
