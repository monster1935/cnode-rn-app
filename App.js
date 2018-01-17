/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  AppRegistry,
  ScrollView,
  Image,
  FlatList,
  SectionList
} from 'react-native';

import RootScene from './src/RootScene';

export default class App extends Component<{}> {

  render() {
    return (
      <RootScene />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },

  title: {
    color: '#000',
    fontSize: 32,
    marginBottom: 60
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'red',
  },
  instructions: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 5,
  },
});
