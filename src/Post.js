// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 文章详情页组件
import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native';
import Markdown from 'react-native-easy-markdown';

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      padding: 10,
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
      fontSize: 16,
    }
  })

  componentWillMount() {
    const postInfo = this.props.navigation.state.params.item;
    this.setState({
      postInfo
    });
  }


  render() {
    return (
      <ScrollView style={styles.container}>
        <Markdown>
          {this.state.postInfo.content}
        </Markdown>
      </ScrollView>
    );
  }
};
export default Post;
