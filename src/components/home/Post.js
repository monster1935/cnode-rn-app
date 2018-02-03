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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/zh-cn';
import HTMLView from 'react-native-htmlview';
import PostStyle from './PostStyle';
import Comment from './Comment';
import InlineImage from '../common/InlineImage';

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
      postInfo: {},
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: '话题',
    headerTitleStyle: {
      fontSize: 18,
      color: '#FEFEFE',
    },
    headerTintColor: '#FEFEFE',
    headerStyle: {
      backgroundColor: '#343434',
    },
    headerRight: <TouchableOpacity onPress={() => {}}><Icon name="md-share-alt" size={24} color="#FEFEFE" style={{marginRight: 20}} /></TouchableOpacity>,
  })

  componentWillMount() {
    const postInfo = this.props.navigation.state.params.item;
    const { id, tab, author,title, content, create_at, visit_count } = postInfo;
    this.setState({
      postInfo: {},
      id,
      tab,
      title,
      author,
      content,
      create_at,
      visit_count,
    }, () => {
      this.getPostDetail();
    });

  }

  getPostDetail() {
    const { id } = this.state;
    axios.get(`https://cnodejs.org/api/v1/topic/${id}`,{
      params: {
        mdrender: true,
      }
    }).then((res) => {
      if (res.status == 200) {
        const data = res.data.data;
        this.setState({
          postInfo: data,
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
    const { loginname } = this.state.postInfo.author;
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
          resizeMode='cover'
        />
      )
    }
  }

  render() {
    const { postInfo, tab, author, content, title, visit_count, create_at} = this.state;
    const createTime = moment(create_at).fromNow();
    return (
      <ScrollView style={styles.container}>
        <View style={styles.block}>
          <Text
            style={{fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 10}}
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
                {author.loginname}
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
            textComponentProps={{style: {flex: 1}}}
            renderNode={this.renderNode}
          />
        </View>
        <View>
          <Comment replies={postInfo.replies} navigation={this.props.navigation}></Comment>
        </View>
      </ScrollView>
    );
  }
};

export default Post;
