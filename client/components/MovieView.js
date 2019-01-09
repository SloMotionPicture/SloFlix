import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class MovieView extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}
  render() {
    return <div className="movie_View" />
  }
}
const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieView)
