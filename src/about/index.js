// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 登录页面组件
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

class About extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '关于',
    headerTitleStyle: {
      fontSize: 16,
      color: '#FEFEFE',
    },
    headerTintColor: '#FEFEFE',
    headerStyle: {
      backgroundColor: '#343434',
    }
  })

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
  }
});

export default About;
