import React from 'react'

import {Navbar, SearchBar, LeftSideBar, Content} from './components'
import Routes from './routes'
const App = () => {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <LeftSideBar />
      <Content />
      <Routes />
    </div>
  )
}

export default App
