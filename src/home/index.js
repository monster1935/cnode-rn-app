// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 主页组件

import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, Image } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import ScrollableView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import axios from 'axios';
import PostList from './PostList';

class Home extends Component {

  render() {
    const types=[
      { title: '全部', component: PostList, type: 'all' },
      { title: '精华', component: PostList, type: 'good'},
      { title: '分享', component: PostList, type: 'share'},
      { title: '问答', component: PostList, type: 'ask'},
      { title: '招聘', component: PostList, type: 'job'},

    ];

    return (
      <ScrollableView
        style={{flex: 1, backgroundColor: '#eee'}}
        tabBarTextStyle={{fontSize: 14}}
        tabBarBackgroundColor="#fff"
        tabBarActiveTextColor="#343434"
        tabBarInactiveTextColor="#aaa"
        tabBarUnderlineStyle={{backgroundColor: '#343434'}}
        renderTabBar={() => <DefaultTabBar style={{borderBottomColor: '#eee'}} />}
      >
        { types.map((v,i) => {
          const Component = v.component;
          return <Component key={i} tabLabel={v.title} type={v.type}
            navigation={this.props.navigation}>{v.title}</Component>
        })}
      </ScrollableView>
    )
  }
};

export default Home;
