// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 收藏组件

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

class Favorite extends Component {
  componentWillMount() {
    console.log('Favorite component will mount');
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableHighlight onPress={() => {
            console.log('效果1');
          }}>
          <Text>效果1</Text>
        </TouchableHighlight>
        <TouchableNativeFeedback onPress={() => {
            console.log('效果2');
          }}>
          <Text>效果2</Text>
        </TouchableNativeFeedback>
        <TouchableOpacity onPress={() => { console.log('效果3')}}>
          <Text>效果3</Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={() => { console.log('效果4')}}>
          <View>
            <Text>效果4</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
};

export default Favorite;
