import React, { Component } from 'react';

import { StackNavigator, } from 'react-navigation';



import LoginScreen from './components/LoginScreen.js'
import HomeScreen from './components/HomeScreen.js'

export default App = StackNavigator({
  Login: LoginScreen,
  Home: HomeScreen,
});
