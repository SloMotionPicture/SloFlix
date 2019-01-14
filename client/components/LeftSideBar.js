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
          <tbody>
            {tagData.map(tag => (
              <tr key={tag.name}>
                <th>
                  <Link to={`/${tag.name}`}>{tag.name}</Link>
                </th>
              </tr>
            ))}
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
    //fetchTags: ()=>fetchAllTags(dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LeftSideBar)
