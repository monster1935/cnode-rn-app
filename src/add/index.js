// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 发布文章组件

import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Publish extends Component {
  componentWillMount() {
    console.log('add component will mount');
  }
  static navigationOptions = ({navigation}) => ({
    title: '发布',
    headerTitleStyle: {
      fontSize: 18,
      color: '#FEFEFE',
    },
    headerTintColor: '#FEFEFE',
    headerStyle: {
      backgroundColor: '#343434',
    }
  })
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>开发中，敬请期待...</Text>
      </View>
    )
  }
};
export default Publish;
