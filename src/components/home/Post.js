// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 文章详情页组件
import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/zh-cn';
import HTMLView from 'react-native-htmlview';
import PostStyle from './PostStyle';
import Comment from './Comment';
import InlineImage from '../common/InlineImage';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#eee',
    },
    block: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
    },
    h1: {
      fontSize: 16
    }
  }
);



class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postDetail: {},
      loading: true,
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: '话题',
    headerTitleStyle: {
      fontSize: 20,
      color: '#FEFEFE',
    },
    headerTintColor: '#FEFEFE',
    headerStyle: {
      backgroundColor: '#343434',
    },
    headerRight: <TouchableOpacity onPress={() => {}}><Icon name="md-share-alt" size={24} color="#FEFEFE" style={{marginRight: 20}} /></TouchableOpacity>,
  })

  componentWillMount() {
    const { postInfo } = this.props.navigation.state.params;
    // props中已经含有文章内容以及作者信息，直接用于渲染，仅仅获取评论
    if (postInfo.content) {
      const { content, author, create_at, visit_count, title} = postInfo;
      this.setState({
        loading: false,
        content,
        author,
        create_at,
        visit_count,
        title,
      });
    }
    const { id } = postInfo;
    this.getPostDetail(id);
  }

  getPostDetail(id) {
    axios.get(`https://cnodejs.org/api/v1/topic/${id}`,{
      params: {
        mdrender: true,
      }
    }).then((res) => {
      this.setState({ loading: false })
      if (res.status == 200) {
        const data = res.data.data;
        this.setState({
          postDetail: data,
          content: data.content,
        });
      } else {
        console.warn(res.statusText);
      }
    }).catch(e => {
      console.error(e);
    });
  }

  // 头像点击导航
  onPressToUser() {
    const { navigation } = this.props;
    const { loginname } = this.state.postDetail.author;
    navigation.navigate('User', {loginname});
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
        <InlineImage
          source={{uri: uri}}
          key={index}
          style={{width: width - 30, height: 200}}
          resizeMode='contain'
        />
      )
    }
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
    let title, author, create_at, visit_count, content;
    const { postInfo } = this.props.navigation.state.params;
    if (postInfo.content) {
      // 直接使用传入的参数渲染
      title = this.state.title;
      author = this.state.author;
      create_at = this.state.create_at;
      visit_count = this.state.visit_count;
      content = this.state.content;
    } else {
      title = this.state.postDetail.title;
      author = this.state.postDetail.author;
      create_at = this.state.postDetail.create_at;
      visit_count = this.state.postDetail.visit_count;
      content = this.state.postDetail.content;
    }
    const createTime = moment(create_at).fromNow();
    const { loading } = this.state;
    return (
      <ScrollView style={styles.container}>
        {
          loading ?
          (
            <View style={{height: height - 100, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#343434" />
            </View>
          )
          :
          (
            <View>
              <View style={styles.block}>
                <Text
                  style={{fontSize: 20, fontWeight: '700', color: '#333', marginBottom: 10}}
                >
                  {title}
                </Text>
                <View
                  style={styles.block,{flexDirection: 'row', alignItems: 'center'}}
                >
                  <TouchableNativeFeedback onPress={this.onPressToUser.bind(this)}>
                    <View>
                      <Image
                        source={{uri: author && author.avatar_url}}
                        style={{width: 30, height: 30, borderRadius: 50, marginRight: 10}}
                      />
                    </View>
                  </TouchableNativeFeedback>
                  <View>
                    <Text
                      style={{fontSize: 12, color: '#333'}}
                    >
                      {author && author.loginname}
                    </Text>
                    <Text style={{fontSize: 12}}>
                      {createTime} 创建 ▪ {visit_count} 次浏览
                    </Text>
                  </View>
                  <View
                    style={{flex: 1,flexDirection: 'row', justifyContent: 'flex-end'}}
                  >
                    <Icon
                      name="md-heart-outline"
                      size={16}
                      color="#000"
                      style={{marginRight: 20}}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.block}>
                <HTMLView
                  value={content}
                  stylesheet={PostStyle}
                  style={{backgroundColor: '#fff'}}
                  textComponentProps={{style: {flex: 1}}}
                  renderNode={this.renderNode}
                  onLinkPress={(url) => this.handlePressLink(url)}
                />
              </View>
              <View>
                <Comment replies={this.state.postDetail.replies} navigation={this.props.navigation}></Comment>
              </View>
            </View>
          )
        }
      </ScrollView>
    );
  }
};

export default Post;
