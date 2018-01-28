// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 收藏组件

import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableNativeFeedback,
  StyleSheet,
  Image,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import PostItem from '../home/PostItem';
import getAuthInfo from '../utils/auth';

class Favorite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postList: [],
      isRefreshing: true,
      token: '',
    };
  }
  static navigationOptions = ({navigation}) => ({
    title: '收藏',
    headerTitleStyle: {
      fontSize: 18,
      color: '#FEFEFE',
    },
    headerTintColor: '#FEFEFE',
    headerStyle: {
      backgroundColor: '#343434',
    }
  })
  componentWillMount() {
    console.log('Favorite will mount');
    console.log(this.props);
    const { token, userInfo } = this.props;
    this.setState({
      token,
    });
    if (token !== '') {
      this.getData(userInfo.loginname);
    }
  }
  componentWillReceiveProps() {
    console.log('Favorite will receive props');
    const { token, userInfo } = this.props;
    this.setState({
      token,
    });
    if (token !== '') {
      this.getData(userInfo.loginname);
    }
  }

  getData(loginname) {
    axios.get(`https://cnodejs.org/api/v1/topic_collect/${loginname}`).then(res => {
      const data = res.data;
      this.setState({
        isRefreshing: false,
      });
      if (res.status === 200) {
        data.data.forEach(el => {
          el.key = el.id;
        });
        this.setState({
          postList: data.data,
        });
      } else {
        console.warn(res.statusText);
      }
    });
  }

  renderItem = ({item, index}) => (
    <TouchableNativeFeedback
      onPress={() => {this.props.navigation.navigate('Post', {item})}}
    >
      <View>
        <PostItem
          item={item}
          index={index}
        />
      </View>
    </TouchableNativeFeedback>
  )

  render() {
    const { token } = this.state;
    return (
      <View style={{flex: 1,backgroundColor: '#eee'}}>
        {
          token === '' ?
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>该模块需要登录账户</Text>
            <TouchableNativeFeedback>
              <View style={styles.btnLogin}>
                <Text style={{color: '#eee'}}>去登录</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          :
          <FlatList
            data={this.state.postList}
            onRefresh={this.getData.bind(this)}
            removeClippedSubviews={false}
            refreshing={this.state.isRefreshing}
            ListFooterComponent={() => <Text style={{textAlign: 'center', padding: 10, transform: [{scale: 0.857143}]}}>已加载全部数据</Text>}
            renderItem={this.renderItem}
          />
        }
      </View>
    )
  }
};

const styles = StyleSheet.create({
  btnLogin: {
    height: 40,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#343434',
    marginTop: 20,
  }
});

const mapStateToProps = ({ token, userInfo }) => ({
    token,
    userInfo,
});

export default connect(mapStateToProps)(Favorite);
