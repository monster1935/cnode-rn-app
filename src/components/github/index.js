// Copyright (c) 2018 by monster1935. All Rights Reserved.
// Github 登录组件
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

class Github extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Github帐号登录',
    headerTitleStyle: {
      fontSize: 20,
      color: '#FEFEFE',
    },
    headerTintColor: '#FEFEFE',
    headerStyle: {
      backgroundColor: '#343434',
    }
  });

  render() {
    return (
      <View style={styles.container}>
        <Text>开发中，敬请期待...</Text>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  }
});

export default Github;
