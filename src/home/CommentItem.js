// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 评论区单条评论组件
import React, { Component } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  }
});

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replies: []
    };
  }

  componentWillMount() {
    this.setState({
      replies: this.props.replies,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        replies: nextProps.replies,
      });
    }
  }
  render() {
    const { replies }  = this.state;
    return (
      <View style={styles.container}>
        <Image
          source={{'uri': 'https://avatars1.githubusercontent.com/u/1147375?v=4&s=120'}}
          style={styles.avatar}
        />
      <View style={{flex: 1, borderBottomWidth: 1, borderBottomColor: '#eee'}}>
          <Text style={{fontSize: 10, color: '#333', marginBottom: 6}}>alsotang</Text>
          <Text style={{fontSize: 10, marginBottom: 6}}>我喜欢你的写作风格</Text>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 10}}>昨天 18：59</Text>
            <View style={{flexDirection: 'row', marginBottom: 6}}>
              <Icon name="md-thumbs-up" size={16} color={'#ccc'}></Icon>
              <Text style={{marginLeft: 6,fontSize: 10, color: '#ccc'}}>9</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
};

export default CommentItem;
