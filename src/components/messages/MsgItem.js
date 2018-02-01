// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 消息评论展示组件

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/zh-cn';

class MsgItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: {}
    };
  }

  componentWillMount() {
    const { item } = this.props;
    this.setState({
      item,
    });
  }

  render() {
    const { item } = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={styles.itemView}>
          <Image
            source={{uri: 'https://avatars3.githubusercontent.com/u/10126576?v=4&amp;s=120'}}
            style={{height: 40,width: 40, marginRight: 10}}
            />
          <View style={styles.comment}>
            <View style={styles.commentTitle}>
              <Text>xxx</Text>
              <Text>评论了</Text>
              <Text>{item.topic.title}</Text>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text>{moment(item.reply.create_at).fromNow()}</Text>
              </View>
            </View>
            <Text style={{marginTop: 10}}>
              {item.reply.content}
            </Text>
          </View>
        </View>
      </View>
    )
  }

};

const styles = StyleSheet.create({
  itemView: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    marginBottom: 10,
  },
  comment: {
    flex: 1,
  },
  commentTitle: {
    flexDirection: 'row'
  }

});

export default MsgItem;
