// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 收藏组件

import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import PostItem from '../home/PostItem';

class Favorite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postList: [],
      isRefreshing: true,
    };
  }
  static navigationOptions = ({navigation}) => ({
    title: '收藏',
    headerTitleStyle: {
      fontSize: 16,
      color: '#FEFEFE',
    },
    headerTintColor: '#FEFEFE',
    headerStyle: {
      backgroundColor: '#343434',
    }
  })
  componentWillMount() {
    this.getData();
  }
  getData() {
    axios.get('https://cnodejs.org/api/v1/topic_collect/alsotang').then(res => {
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
    <TouchableOpacity
      onPress={() => {this.props.navigation.navigate('Post', {item})}}
    >
      <PostItem
        item={item}
        index={index}
      />
    </TouchableOpacity>
  )

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.postList}
          onRefresh={this.getData.bind(this)}
          removeClippedSubviews={false}
          refreshing={this.state.isRefreshing}
          ListFooterComponent={() => <Text style={{textAlign: 'center', padding: 10, transform: [{scale: 0.857143}]}}>已加载全部数据</Text>}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
};

export default Favorite;
