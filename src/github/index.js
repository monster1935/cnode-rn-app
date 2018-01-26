// Copyright (c) 2018 by monster1935. All Rights Reserved.
// Github 登录组件
import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

class Github extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Github帐号登录',
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
      <View style={{flex: 1}}>
        <Text>est</Text>
      </View>
    )
  }
};

export default Github;
