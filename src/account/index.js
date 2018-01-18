// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 我的相关 组件

import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Account extends Component {
  componentWillMount() {
    console.log('account component will mount');
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>我的</Text>
      </View>
    )
  }
};

export default Account;
