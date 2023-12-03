import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from './src/Screens/HomeScreen'
import { store } from './src/util/Redux/store'
import { Provider } from 'react-redux'
import LoginScreen from './src/Screens/LoginScreen'

type Props = {}

const App = (props: Props) => {
  return (
    <Provider store={store}>
      <HomeScreen></HomeScreen>
    </Provider>
  )
}

export default App