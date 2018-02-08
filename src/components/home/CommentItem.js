// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 评论区单条评论组件
import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { connect } from 'react-redux';
import { MaterialDialog } from 'react-native-material-dialog';
import axios from 'axios';
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
      reply: {},
      numberUps: 0,
      confirmVis: false,
      token: '',
    };
  }

  componentWillMount() {
    const { token } = this.props;
    this.setState({
      reply: this.props.reply,
      numberUps: this.props.reply.ups.length,
      token,
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

  // 用户点赞处理
  handlePressUps() {
    const { token, reply, numberUps } = this.state;
    if (!token) {
      this.setState({
        confirmVis: true,
      });
    } else {
      const url = `https://cnodejs.org/api/v1/reply/${reply.id}/ups`;
      axios.post(url, {
        accesstoken: token,
      })
      .then(res => {
        if (res.status === 200) {
          const data = res.data;
          this.setState({
            reply: { ...reply, is_uped: data.action === 'up' },
            numberUps: data.action === 'up' ? numberUps + 1 : numberUps - 1
          });
        }
      })
      .catch(e => {
        console.error(e);
      })
    }
  }

  handleLogin() {
    this.setState({
      confirmVis: false,
    });
    const { navigation } = this.props;
    navigation.navigate('Login');
  }

  renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.name == 'img') {
      const { src } = node.attribs;
      if (src) {
        let uri = src;
        if (!src.includes('http')) {
          uri = 'http:' + src;
        }
        const { width } = Dimensions.get('window');
        return (
          <AutoSizedImage
            source={{uri: uri}}
            key={index}
            viewWidth={ width  - 30 - 50 }
            style={{width: 0, height: 0, }}
          />
        )
      } else {
        return null;
      }
    }
  }

  render() {
    const { reply, numberUps }  = this.state;
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
              <View style={{flexDirection: 'row', marginBottom: 6}}>
                <TouchableOpacity onPress={this.handlePressUps.bind(this)}>
                  <Icon
                    name="md-thumbs-up"
                    size={16}
                    color={ reply.is_uped ? '#666' : '#ccc'}
                  >
                  </Icon>
                </TouchableOpacity>
                <Text
                  style={{marginLeft: 6,fontSize: 12, color: '#ccc'}}
                >
                  {numberUps}
                </Text>
              </View>
            </View>
          </View>
          <MaterialDialog
            title="CNode社区"
            visible={this.state.confirmVis}
            cancelLabel="取消"
            okLabel="去登录"
            onOk={this.handleLogin.bind(this)}
            onCancel={() => this.setState({ confirmVis: false})}
          >
            <Text>
              该操作需要登录账户，是否现在登录？
            </Text>
          </MaterialDialog>
      </View>
    )
  }
};

const mapStateToProps = ({ token, userInfo }) => ({
    token,
    userInfo,
});

export default connect(mapStateToProps)(CommentItem);
