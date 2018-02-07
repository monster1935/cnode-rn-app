// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 文章列表项组件
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import moment from 'moment';
import 'moment/locale/zh-cn';
import HTMLView from '../common/htmlview';
import TextProps from '../common/TextProps';

const PostStyle = {
  a: {
    fontWeight: '300',
    color: '#0E83E1',
  },
};

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

  getPreContent(content) {
    const len = content.length, start = content.indexOf('<p>') + 3,
          end = content.indexOf('</p>') - 4;
    return content.substring(start, end);
  }

  renderNode(node,index,list,parent,domToElement) {
    if (node.name === 'img') {
      return <Text key={index}>[图片]</Text>;
    }
  }

  getPreContent() {
    const { item } = this.state;
    const { content } = item;
    const len = content.length,
          start = content.indexOf('<p>'),
          end = content.indexOf('</p>') + 4;
    return content.substring(start,end);
  }

  // a 标签 link处理，app内部webview渲染html
  handlePressLink(url) {
    const { navigation } = this.props;
    const res = url.match(/\/user\//);
    if (res && res.index === 0) {
      // eg: /user/coldraincn 跳转用户详情
      const loginname = url.split('/')[2];
      navigation.navigate('User', { loginname })
    } else {
      // 跳转到webview 渲染具体的html
      navigation.navigate('WebContainer', { url });
    }
  }

  render() {
    const { item } = this.state;
    const createTime = moment(item.create_at).fromNow();
    const replyTime = moment(item.last_reply_at).fromNow();

    return (
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image
            source={{uri: item.author.avatar_url}}
            style={{width: 20, height: 20, borderRadius: 10}}
          />
          <Text style={{marginLeft: 6, fontSize: 12}}>
            {item.author.loginname} 发布了文章 ▪ {createTime}
          </Text>
        </View>
        <View style={{marginBottom: 6}}>
          <Text
            style={{color: '#333', marginTop: 6, marginBottom: 6, fontSize: 16, fontWeight: '700'}}
          >
            {item.title}
          </Text>
          <HTMLView
            value={this.getPreContent()}
            stylesheet={PostStyle}
            textComponentProps={TextProps}
            renderNode={this.renderNode}
            onLinkPress={(url) => this.handlePressLink(url)}
          />
        </View>
        <View>
          <Text style={{ fontSize: 12}}>
            {item.reply_count} 评论 ▪
            {item.visit_count} 浏览 ▪
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
