// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 文章详情页组件
import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Dimensions
} from 'react-native';

import Comment from './home/Comment';
import axios from 'axios';

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
    },
  }
);

class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postInfo: {},
      title: 'ceshji'
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.item.title,
    headerTitleStyle: {
      fontSize: 14,
    }
  })

  componentWillMount() {
    const postInfo = this.props.navigation.state.params.item;
    const { id } = postInfo;
    this.setState({
      postInfo: {},
      id: id,
    }, () => {
      this.getPostDetail();
    });

  }

  getPostDetail() {
    const { id } = this.state;
    axios.get(`https://cnodejs.org/api/v1/topic/${id}`,{
      params: {
        mdrender: false,
      }
    }).then((res) => {
      if (res.status == 200) {
        const data = res.data.data;
        this.setState({
          postInfo: data,
        });
      } else {
        console.warn(res.statusText);
      }
    }).catch(e => {
      console.error(e);
    });
  }

  render() {
    const { replies, content} = this.state.postInfo;
    return (
      <ScrollView style={styles.container}>
        <View style={{backgroundColor: '#fff', padding: 10}}>
          <Text style={{fontSize: 10}}>{content}</Text>
        </View>
        <View>
          <Comment replies={replies}></Comment>
        </View>
      </ScrollView>
    );
  }
};

export default Post;
