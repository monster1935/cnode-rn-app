// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 文章列表组件

import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postList: [],
    };
  }
  componentWillMount() {
    console.log('component will mount');
    console.log(this.props.navigation.state.routeName);
    this.getPostData();
  }
  componentDidMount() {
    console.log('component did mount');
    this.getPostData()
  }
  componentWillReceiveProps() {
    console.log('component will receive props');
  }
  shouldComponentUpdate(nextProps) {
    return false;
  }
  getPostData() {
    axios.get('https://cnodejs.org/api/v1/topics').then(res => {
      const data = res.data;
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

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.postList.length}</Text>
        <FlatList
          data={this.state.postList}
          renderItem={({item}) => <Text style={styles.item}>{item.title}</Text>}>
        </FlatList>
      </View>
    );
  }
};

export default PostList;
