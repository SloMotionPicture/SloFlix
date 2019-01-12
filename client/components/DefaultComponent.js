import React from 'react'
import {Navbar, SearchBar, LeftSideBar, Content} from './index'

const DefaultComponent = () => {
  return (
    <div className="default">
      <Navbar />
      <SearchBar />
      <LeftSideBar />
      <Content />
    </div>
  )
}

export default DefaultComponent
