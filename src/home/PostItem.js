// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 文章列表项组件
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import moment from 'moment';
import 'moment/locale/zh-cn';

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      index: 0,
    };
  }

  componentWillMount() {
    const { item, index }  = this.props;
    this.setState({
      item,
      index
    });
  }

  render() {
    const { item } = this.state;
    const createTime = moment(item.create_at).fromNow();
    const replyTime = moment(item.last_reply_at).fromNow()
    return (
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image source={{uri: item.author.avatar_url}} style={{width: 20, height: 20, borderRadius: 10}}></Image>
          <Text style={{marginLeft: 6, fontSize: 10}}>
            {item.author.loginname} 发布了文章 ● {createTime}
          </Text>
        </View>
        <View style={{marginBottom: 6}}>
          <Text style={{color: '#333', marginTop: 6, marginBottom: 6, fontSize: 12}}>{item.title}</Text>
          <Text style={{ fontSize: 10}}>{item.content.substring(0,100)}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 10}}>
            {item.reply_count} 评论 ●
            {item.visit_count} 浏览 ●
            {replyTime} 最后回复
          </Text>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
  }
});

export default PostItem;
