// Copyright (c) 2018 by monster1935. All Rights Reserved.
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from './home';
import Favorite from './favorite';
import Publish from './add';
import Message from './messages';
import Account from './account';
import Post from './Post';

const Tab  = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '主题',
        header: null,
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="md-home" size={20} color={tintColor}></Icon>
        )
      }),
    },
    Favorite: {
      screen: Favorite,
      navigationOptions: ({navigation}) => ({
        title: '收藏',
        tabBarLabel: '收藏',
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="md-bookmark" size={20} color={tintColor}></Icon>
        )
      }),
    },
    Add: {
      screen: Publish,
      navigationOptions: ({navigation}) => ({
        title: '发布',
        tabBarLabel: '',
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="md-add-circle" size={20} color={tintColor}></Icon>
        )
      }),
    },
    Messages: {
      screen: Message,
      navigationOptions: ({navigation}) => ({
        title: '消息',
        tabBarLabel: '消息',
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="md-folder" size={20} color={tintColor}></Icon>
        )
      }),
    },
    Account: {
      screen: Account,
      navigationOptions: ({navigation}) => ({
        title: '我的',
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="md-person" size={20} color={tintColor}></Icon>
        )
      }),
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    initialRouteName: 'Home',
    lazy: true,
    tabBarOptions: {
        activeTintColor: '#c62f2f',
        inactiveTintColor: '#eee',
        style: {
            backgroundColor: '#333333'
        }
    }
  }
);


const BasicApp = StackNavigator(
  {
    Tab: { screen: Tab },
    Post: { screen: Post },
  },
  {
    initialRouteName: 'Tab',
  }
);


class RootScene extends PureComponent {
  render() {
    return (
      <View style={{flex:1}}>
        <BasicApp />
      </View>
    )
  }
};

export default RootScene;
