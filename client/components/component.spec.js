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

  it('', () => {})
})
