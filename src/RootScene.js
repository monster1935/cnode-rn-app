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

const Tab  = TabNavigator(
  {
    DiscoverMusic: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '主题',
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="md-home" size={30} color={tintColor}></Icon>
        )
      }),
    },
    MyMusic: {
      screen: Favorite,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '收藏',
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="md-bookmark" size={30} color={tintColor}></Icon>
        )
      }),
    },
    Add: {
      screen: Publish,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '',
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="md-add-circle" size={30} color={tintColor}></Icon>
        )
      }),
    },
    Friends: {
      screen: Message,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '消息',
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="md-folder" size={30} color={tintColor}></Icon>
        )
      }),
    },
    Account: {
      screen: Account,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="md-person" size={30} color={tintColor}></Icon>
        )
      }),
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName: 'DiscoverMusic',
    lazy: true,
    tabBarOptions: {
        activeTintColor: '#ffffff',
        inactiveTintColor: '#cccccc',
        style: {
            backgroundColor: '#333333'
        }
    }
    }
);


const BasicApp = StackNavigator(
  {
    Tab: { screen: Tab },
  },
  {
    initialRouteName: 'Tab',
    headerMode: 'none'
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
