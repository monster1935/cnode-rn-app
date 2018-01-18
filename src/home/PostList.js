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
import Loading from '../Loading';

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
      type: '',
      isLoading: false,
    };
  }
  componentWillMount() {
    this.getPostData(this.state.type);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.screenProps.routeName !== this.props.screenProps.routeName) {
      this.getPostData(nextProps.screenProps.routeName);
    }
  }
  static navigationOptions = {
   header: null
  };

  getPostData(type) {
    this.setState({
      isLoading: true,
    });
    axios.get('https://cnodejs.org/api/v1/topics',{
      params: {
        tab: type,
        mdrender: false,
      }
    }).then(res => {
      const data = res.data;
      if (res.status === 200) {
        this.setState({
          isLoading: false,
        });
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
        {
          this.state.isLoading ? (<Loading />) : (null)
        }
        <FlatList
          data={this.state.postList}
          renderItem={
            ({item}) => (
              <Text
                onPress={() => {this.props.navigation.navigate('Post', {item})}}
                style={styles.item}
              >
                {item.title}
              </Text>
            )
          }
        >
        </FlatList>
      </View>
    );
  }
};

export default PostList;
