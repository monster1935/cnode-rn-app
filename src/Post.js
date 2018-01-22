// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 文章详情页组件
import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  Image,
  View
} from 'react-native';
// import {MarkdownView} from 'react-native-markdown-view';
// import postStyle from './post-style.js';
import HTMLView from 'react-native-htmlview';

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff'
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
    this.setState({
      postInfo
    });
  }

  renderNode(node, index) {
    node.name == 'img' && console.log(node.attribs.src);
    if (node.name == 'img') {
      return (
        <Image
          key={index}
          source={{uri: node.attribs.src}}
          style={{width: 640, height: 160}} />
      );
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <HTMLView value={this.state.postInfo.content} renderNode={this.renderNode}/>
      </ScrollView>
    );
  }
};
export default Post;
