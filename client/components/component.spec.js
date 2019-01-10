/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {MovieView} from '../components'
import {Provider} from 'react-redux'
import store from '../store'
import moduleName from 'module'
const adapter = new Adapter()
enzyme.configure({adapter})

describe('Components', () => {
  let movieView

  beforeEach(() => {
    movieView = shallow(
      <Provider store={store}>
        <MovieView />
      </Provider>
    )
  })

  // OB/MS: dead code
  it('renders a movie title', () => {
    expect('testing').to.not.equal('testing')
  })
  it('renders a movie image', () => {
    expect('testing').to.not.equal('testing')
  })
  it('renders movies into a grid of cells', () => {
    expect('testing').to.not.equal('testing')
  })
  it('renders all tags in the LeftSideBar', () => {
    expect('testing').to.not.equal('testing')
  })
  it('has Login and SignUp buttons with classNames `login` and`signUp` respectively', () => {
    expect('testing').to.not.equal('testing')
  })
})
