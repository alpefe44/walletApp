import React from 'react'
import { store } from './src/util/Redux/store'
import { Provider } from 'react-redux'
import Router from './src/Navigation/Router'

type Props = {}

const App = (props: Props) => {
  return (
    <Provider store={store}>
      <Router></Router>
    </Provider>
  )
}

export default App