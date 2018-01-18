// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 主页组件

import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import axios from 'axios';
import PostList from './PostList';
import Post from '../Post';

const Tab = TabNavigator(
  {
    all: {
      screen: PostList,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '全部',
      }),
    },
    good: {
      screen: PostList,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '精华',
      }),
    },
    share: {
      screen: PostList,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '分享',
      }),
    },
    ask: {
      screen: PostList,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '问答',
      }),
    },
    job: {
      screen: PostList,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '招聘',
      }),
    },
  },
  {
    swipeEnabled: false,
    animationEnabled: false,
    initialRouteName: 'all',
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

const HomeApp = StackNavigator(
  {
    Tab: { screen: Tab,},
    Post: { screen: Post }
  },
);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenProps: {
        routeName: 'all',
      },
    };
  }
  componentWillMount() {
    console.log('home component will mount');
  }

  handleNavigationStateChange(route) {
    console.log('routename,', route);
    this.setState({
      screenProps: {
        routeName: route.routeName
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <HomeApp
          screenProps={this.state.screenProps}
          onNavigationStateChange={(prevState, currState, route) => {
            this.handleNavigationStateChange(route);
          }}
        />
      </View>
    )
  }
};

export default Home;
