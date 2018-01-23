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
// import {MarkdownView} from 'react-native-markdown-view';
// import postStyle from './post-style.js';
import HTMLView from 'react-native-htmlview';
import Comment from './home/Comment';
import axios from 'axios';

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
    },

    img: {
      width: 320,
      height: 160,
    },

    h1: {
      fontSize: 16,
      color: '#333',
      fontWeight: 'normal'
    },
    h2: {
      fontSize: 16,
      color: '#333',
      fontWeight: 'normal'
    },
    h3: {
      fontSize: 16,
      color: '#333',
      fontWeight: 'normal'
    },
    h4: {
      fontSize: 16,
      color: '#333',
      fontWeight: 'normal'
    },
    h5: {
      fontSize: 16,
      color: '#333',
      fontWeight: 'normal'
    },
    p: {
      fontSize: 12,
    },
    li: {
      fontSize: 12,
    },
    div: {
      fontSize: 12,
    }
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
    axios.get(`https://cnodejs.org/api/v1/topic/${id}`).then((res) => {
      console.log(res);
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

  renderNode(node, index) {
    if (node.name == 'img') {
      // 兼容图片 src 不含有 http 的情况
      if (node.attribs.src && !String(node.attribs.src).includes('https') || !String(node.attribs.src).includes('http')) {
        node.attribs.src = 'http:' + node.attribs.src;
      }
      return (
        <Image
          key={index}
          source={{uri: node.attribs.src}}
          style={{height: 640, width: 900 }}
        />
      );
    }
  }

  render() {
    const { replies } = this.state.postInfo;
    return (
      <ScrollView style={styles.container}>
        <HTMLView
          style={{backgroundColor: '#fff', padding: 10}}
          value={this.state.postInfo.content}
          renderNode={this.renderNode}
          stylesheet={styles}
        />
        <View>
          <Comment replies={replies}></Comment>
        </View>
      </ScrollView>
    );
  }
};

export default Post;
