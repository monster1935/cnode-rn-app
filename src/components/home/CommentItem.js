// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 评论区单条评论组件
import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { connect } from 'react-redux';
import AutoSizedImage from '../common/htmlview/AutoSizedImage';
import PostStyle from '../common/PostStyle';
import HTMLView from '../common/htmlview';
import TextProps from '../common/TextProps';

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
      reply: {}
    };
  }

  componentWillMount() {
    this.setState({
      reply: this.props.reply,
    });
  }

  // navigate to user detail
  handlePressToUser(loginname) {
    const { navigation } = this.props;
    navigation.navigate('User', {loginname});
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

  renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.name == 'img') {
      const { src } = node.attribs;
      let uri = src;
      if (!src.includes('http')) {
        uri = 'http:' + src;
      }
      const { width } = Dimensions.get('window');
      return (
        <AutoSizedImage
          source={{uri: uri}}
          key={index}
          style={{width: 0, height: 0}}
        />
      )
    }
  }

  render() {
    const { reply }  = this.state;
    return (
      <View style={styles.container}>
        <TouchableNativeFeedback onPress={() => this.handlePressToUser(reply.author.loginname)}>
          <View>
            <Image
              source={{'uri': reply.author.avatar_url}}
              style={styles.avatar}
            />
          </View>
        </TouchableNativeFeedback>
        <View style={{flex: 1, borderBottomWidth: 1, borderBottomColor: '#eee'}}>
            <Text
              style={{fontSize: 12, color: '#333', marginBottom: 6}}
            >
              {reply.author.loginname}
            </Text>
            <HTMLView
              value={reply.content}
              stylesheet={PostStyle}
              renderNode={this.renderNode}
              textComponentProps={TextProps}
              onLinkPress={(url) => this.handlePressLink(url)}
            />
            <View
              style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}
            >
              <Text
                style={{fontSize: 12}}
              >
                {moment(reply.create_at).fromNow()}
              </Text>
              <View
                style={{flexDirection: 'row', marginBottom: 6}}
              >
                <Icon name="md-thumbs-up" size={16} color={'#ccc'}></Icon>
                <Text
                  style={{marginLeft: 6,fontSize: 12, color: '#ccc'}}
                >
                  {reply.ups.length}
                </Text>
              </View>
            </View>
          </View>
      </View>
    )
  }
};

export default CommentItem;
