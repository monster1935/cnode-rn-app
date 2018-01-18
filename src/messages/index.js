// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 消息组件
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Messages extends Component {
  componentWillMount() {
    console.log('message component will mount');
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>消息</Text>
      </View>
    )
  }
};

export default Messages;
