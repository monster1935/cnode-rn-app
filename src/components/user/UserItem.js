// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 最近回复条目组件
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/zh-cn';

class ReplyItem extends Component {

  render() {
    console.log('replyItems: ', this.props);
    const { title, last_reply_at, author } = this.props.data;
    const createTime = moment(last_reply_at).fromNow();
    return (
      <View style={styles.container}>
        <View style={{marginRight: 20}}>
          <Image source={{uri: author && author.avatar_url}} style={styles.image} />
        </View>
        <View style={{flex: 1}}>
          <Text numberOfLines={1} style={{marginBottom: 10}}>{title}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
            <Text>{author && author.loginname}</Text>
            <Text>{createTime}</Text>
          </View>
        </View>
      </View>

    )
  }

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 10,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 50,
  }
})

export default ReplyItem;
