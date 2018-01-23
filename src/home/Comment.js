// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 评论组件，用于展示文章的评论

import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CommentItem from './CommentItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  comment: {
    backgroundColor: '#fff',
  }
});

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replies: [],
    };
  }

  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.replies !== this.props.replies) {
      this.setState({
        replies: nextProps.replies,
      },() => {
        console.log(this.state.replies);
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={{padding: 10,justifyContent: 'center'}}><Text>精彩评论(7)</Text></View>
          <View style={styles.comment}>
            <CommentItem replies={this.state.replies}></CommentItem>
            <CommentItem></CommentItem>
            <CommentItem></CommentItem>
            <CommentItem></CommentItem>
            <CommentItem></CommentItem>
            <CommentItem></CommentItem>
          </View>
        </View>
        <View>
          <View style={{padding: 10,justifyContent: 'center'}}><Text>评论(537)</Text></View>
          <View style={styles.comment}>
            <CommentItem></CommentItem>
            <CommentItem></CommentItem>
            <CommentItem></CommentItem>
            <CommentItem></CommentItem>
          </View>
        </View>
      </View>
    );
  }
};

export default Comment;
