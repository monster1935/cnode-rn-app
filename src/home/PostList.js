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

class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postList: [],
      type: '',
      isLoading: true,
    };
  }
  componentWillMount() {
    const { type } = this.props;
    console.log('type: ', type);
    this.setState({
      type
    }, () => {
      this.getPostData(this.state.type);
    });
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        delayShowScrollTableView: true,
      });
    }, 500);
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps: ', nextProps);
  }
  static navigationOptions = {
   header: null
  };

  getPostData(type) {
    console.log('getPostData, type: ', type);
    axios.get('https://cnodejs.org/api/v1/topics',{
      params: {
        tab: type === 'all' ? '' : type,
        mdrender: false,
      }
    }).then(res => {
      const data = res.data;
      this.setState({
        isLoading: false,
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

  renderItem = ({item, index}) => (
    <TouchableOpacity onPress={() => {this.props.navigation.navigate('Post', {item})}}>
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
          refreshing={this.state.isLoading}
          ListFooterComponent={() => <Text style={{textAlign: 'center', padding: 10, transform: [{scale: 0.857143}]}}>已加载完全部数据</Text>}
          renderItem={this.renderItem}
        >
        </FlatList>
      </View>
    );
  }
};

export default PostList;
