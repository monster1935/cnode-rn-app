// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 主页组件

import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import axios from 'axios';
import PostList from './PostList';

const Tab = TabNavigator(
  {
    All: {
      screen: PostList,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '全部',
      }),
    },
    Good: {
      screen: PostList,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '精华',
      }),
    },
    Share: {
      screen: PostList,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '分享',
      }),
    },
    Job: {
      screen: PostList,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '招聘',
      }),
    },
  }
);

class Home extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Tab />
      </View>
    )
  }
};

export default Home;
