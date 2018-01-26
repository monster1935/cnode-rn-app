// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 用户详情页
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

class User extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '用户详情',
    headerTitleStyle: {
      fontSize: 18,
      color: '#FEFEFE',
    },
    headerTintColor: '#FEFEFE',
    headerStyle: {
      backgroundColor: '#343434',
    }
  });

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee'}}>
        <Text>开发中，敬请期待...</Text>
      </View>
    )
  }
};

export default User;
