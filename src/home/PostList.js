// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 文章列表组件

import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import PostItem from './PostItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

const pageNumber = 1;

class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postList: [],
      type: '',
      isRefreshing: true,
      isLoadingMore: true,

    };
  }
  componentWillMount() {
    const { type } = this.props;
    this.setState({
      type
    }, () => {
      this.getPostData(this.state.type);
    });
  }

  static navigationOptions = {
   header: null
  };

  doGetData(type, param = {}) {
    return axios.get('https://cnodejs.org/api/v1/topics',{
      params: {
        ...param,
        tab: type === 'all' ? '' : type,
        mdrender: false,
      }
    });
  }

  getPostData(type, param = {}) {
    this.doGetData(type, param).then(res => {
      const data = res.data;
      this.setState({
        isRefreshing: false,
        isLoadingMore: false,
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
    }).catch(e => {
      console.error(e);
    });;
  }

  loadMore() {
    const { isLoadingMore }  = this.state;
    if (!isLoadingMore) {
      this.setState({
        isLoadingMore: true
      });
      this.doGetData(this.state.type, { page: ++pageNumber }).then(res => {
        const data = res.data;
        this.setState({
          isLoadingMore: false,
        });
        if (res.status === 200) {
          data.data.forEach(el => {
            el.key = el.id;
          });
          this.setState({
            postList: this.state.postList.concat(data.data)
          });
        }
      });
    }
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
      <View style={styles.container}>
        <FlatList
          data={this.state.postList}
          onRefresh={this.getPostData.bind(this, this.state.type)}
          removeClippedSubviews={false}
          refreshing={this.state.isRefreshing}
          onEndReached={this.loadMore.bind(this)}
          ListFooterComponent={() => <Text style={{textAlign: 'center', padding: 10, transform: [{scale: 0.857143}]}}>已加载全部数据</Text>}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
};

export default PostList;
