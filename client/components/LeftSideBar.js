import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {tagData} from '../../script/dummydata'

class LeftSideBar extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}
  render() {
    return (
      <div className="left_Bar">
        <h2>Tags</h2>
        <table>
          {tagData.map(tag => (
            <tr>
              <Link to={`/${tag.name}`}>{tag.name}</Link>
            </tr>
          ))}
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
    //fetchTags: ()=>fetchAllTags(dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LeftSideBar)
