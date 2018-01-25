// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 设置页面组件
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

class Setting extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '设置',
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

  }
});

export default Setting;
