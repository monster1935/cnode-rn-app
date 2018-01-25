// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 我的相关 组件

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableNativeFeedback
} from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';

class Account extends Component {

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
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      userInfo: {}
    };
  }

  componentWillMount() {
    console.log('account component will mount');
    console.log('account state: ', this.state);
  }

  componentDidMount() {
    console.log('account component did mount');
    console.log('account state: ', this.state);
  }

  componentWillReceiveProps(nextProps) {
    console.log('account component componentWillReceiveProps');
    console.log('account props: ', nextProps);
    if (nextProps.token !== this.state.token) {
      this.setState({
        userInfo: nextProps.userInfo,
        token: nextProps.token,
      });
    }
  }

  onPressToNavigation(type) {
    this.props.navigation.navigate(type);
  }

  render() {
    const { loginname, avatar_url } = this.state.userInfo;
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: '#fff', marginTop: 10, marginBottom: 10, padding: 20, flexDirection: 'row'}}>
          <TouchableNativeFeedback onPress={this.onPressToNavigation.bind(this, 'Login')}>
            <View>
              <Image
                source={{uri: avatar_url ||  'https://avatars2.githubusercontent.com/u/25356455?v=4&amp;s=120'}}
                style={{width: 80,height: 80, marginRight: 10}}
              />
            </View>
          </TouchableNativeFeedback>
          <View style={{justifyContent: 'center'}}>
            <Text style={{marginBottom: 10}}>{loginname || '登录CNode社区，体验更多功能'}</Text>
            <Text style={{fontSize: 12}}>点击头像登录</Text>
          </View>
        </View>
        <View style={{backgroundColor: '#fff',paddingLeft: 20, paddingRight: 20, marginBottom: 20}}>
          <TouchableNativeFeedback onPress={this.onPressToNavigation.bind(this,'Favorite')}>
            <View>
              <ListItem title="收藏" icon="md-bookmark"/>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={this.onPressToNavigation.bind(this,'Messages')}>
            <View>
              <ListItem title="消息" icon="md-folder"/>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={{backgroundColor: '#fff',paddingLeft: 20, paddingRight: 20}}>
          <TouchableNativeFeedback onPress={this.onPressToNavigation.bind(this,'Setting')}>
            <View>
              <ListItem title="设置" icon="md-settings"/>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={this.onPressToNavigation.bind(this,'About')}>
            <View>
              <ListItem title="关于" icon="md-person"/>
            </View>
          </TouchableNativeFeedback>
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

const mapStateToProps = ({ token, userInfo }) => ({
    token,
    userInfo,
});

export default connect(mapStateToProps)(Account);
