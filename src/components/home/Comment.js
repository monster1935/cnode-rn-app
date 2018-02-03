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
      commonReplies: [],
      goodReplies: [],

    };
  }

  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.replies !== this.props.replies) {
      const { replies } = nextProps;
      let goodReplies = [], commonReplies = [];
      replies.forEach(el => {
        if (el.ups.length > 5) {
          goodReplies.push(el);
        } else {
          commonReplies.push(el);
        }
      });
      this.setState({
        commonReplies,
        goodReplies,
      });
    }
  }

  render() {
    const { goodReplies, commonReplies } = this.state;
    return (
      <View style={styles.container}>
        {
          goodReplies.length ? (
            <View>
              <View style={{padding: 10,justifyContent: 'center'}}>
                <Text>精彩评论({goodReplies.length})</Text>
              </View>
              <View style={styles.comment}>
                {
                  goodReplies.map((reply,index) => {
                    return (<CommentItem key={index} reply={reply} navigation={this.props.navigation}/>);
                  })
                }
              </View>
            </View>
          ) : null
        }
        <View>
          <View style={{padding: 10,justifyContent: 'center'}}>
            <Text>评论({commonReplies.length})</Text>
          </View>
          <View style={styles.comment}>
            {
              commonReplies.length ? commonReplies.map((reply,index) => {
                  return (<CommentItem key={index} reply={reply} navigation={this.props.navigation} />);
                }) : null

            }
          </View>
        </View>
      </View>
    );
  }
};

export default Comment;
