// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 我的相关 组件

import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import ListItem from './ListItem';

class Account extends Component {
  componentWillMount() {
    console.log('account component will mount');
  }

  static navigationOptions = ({navigation}) => ({
    title: '我的',
    headerTitleStyle: {
      fontSize: 16,
      color: '#FEFEFE',
    },
    headerTintColor: '#FEFEFE',
    headerStyle: {
      backgroundColor: '#343434',
    }
  })

  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: '#fff', marginTop: 10, marginBottom: 10, padding: 20, flexDirection: 'row'}}>
          <Image
            source={{uri: 'https://avatars2.githubusercontent.com/u/25356455?v=4&amp;s=120'}}
            style={{width: 80,height: 80, marginRight: 10}}
          />
          <View style={{justifyContent: 'center'}}>
            <Text style={{marginBottom: 10}}>登录CNode社区，体验更多功能</Text>
            <Text>点击头像登录</Text>
          </View>
        </View>
        <View style={{backgroundColor: '#fff',paddingLeft: 20, paddingRight: 20, marginBottom: 20}}>
          <ListItem title="收藏" icon="md-bookmark"/>
          <ListItem title="消息" icon="md-folder"/>
        </View>
        <View style={{backgroundColor: '#fff',paddingLeft: 20, paddingRight: 20}}>
          <ListItem title="设置" icon="md-settings"/>
          <ListItem title="关于" icon="md-person"/>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  block: {
    padding: 20,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    color: '#000'
  }
});

export default Account;
