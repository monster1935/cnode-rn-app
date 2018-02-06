// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 用户详情页
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  SectionList,
  ScrollView,
  TouhableOpacity,
  Dimensions,
  TouchableNativeFeedback,
  Linking,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import moment from 'moment';
import 'moment/locale/zh-cn';
import PageHeader from './PageHeader';
import UserItem from './UserItem';
import replies from './replies.json'

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;
const windowHeight = winWidth * 0.7;

class User extends Component {

  static navigationOptions = ({navigation}) => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      isRefreshing: true,
      scrollY: new Animated.Value(10),
    };
  }

  componentWillMount() {
    const { loginname } = this.props.navigation.state.params;
    this.getUserInfo(loginname);
  }

  getUserInfo(loginname) {
    axios.get(`https://cnodejs.org/api/v1/user/${loginname}`)
    .then(res => {
      if (res.status === 200) {
        const data = res.data;
        this.setState({
          userInfo: data.data,
          isRefreshing: false,
        });
      }
    })
    .catch(e => {
      console.error(e);
    });
  }

  handlePressLink(url) {
    if (!url) {
      return;
    }
    // 改为app内部 webview 渲染 html
    const { navigation } = this.props;
    navigation.navigate('WebContainer', {url: url});
  }

  renderHeader() {
    const { avatar_url, loginname, githubUsername, score, create_at } = this.state.userInfo;
    const createTime = moment(create_at).format('YYYY-MM-DD');
    return (
      <Animated.View style={{
        height: winWidth * 0.7 + 50,
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 0,
        top: 50,
        right: 0,
        bottom: 0,
        zIndex: 9,
        width: winWidth,
        opacity: this.state.scrollY.interpolate({
            inputRange: [-windowHeight, 0, windowHeight / 1.2],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp'
        }),
        transform: [{
            translateY: this.state.scrollY.interpolate({
                inputRange: [ -windowHeight, 0, windowHeight],
                outputRange: [windowHeight/2, 0, -50],
                extrapolate: 'clamp'
            })
        }]
      }}>
        <View style={{alignItems: 'center'}}>
          <Image source={{uri: avatar_url}} style={styles.avatar} />
          <Text style={{color: '#fff', marginBottom: 6,}}>{loginname}</Text>
            <TouchableNativeFeedback onPress={this.handlePressLink.bind(this,`https://github.com/${githubUsername}`)}>
              <View>
                <Text
                  style={{color: '#eee', fontSize: 12, marginBottom: 6}}>
                  {`${githubUsername}@github.com`}
                </Text>
              </View>
            </TouchableNativeFeedback>
        </View>
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16}}
        >
          <Text style={{color: '#eee', fontSize: 12}}>注册时间：{createTime}</Text>
          <Text style={{color: '#eee', fontSize: 12}}>积分：{score}</Text>
        </View>

      </Animated.View>
    );
  }

  renderItem(item) {
    return (
      <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Post', {postInfo: item})}>
        <View>
          <UserItem data={item}/>
        </View>
      </TouchableNativeFeedback>

    )
  }
  render() {
    const { scrollY, userInfo, isRefreshing} = this.state;
    const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
    return (
      <View style={{flex: 1}}>
        <Animated.Image
          style={{
            position: 'absolute',
            backgroundColor: '#2e2f31',
            width: winWidth,
            resizeMode: 'cover',
            height: windowHeight,
            opacity: scrollY.interpolate({
                inputRange: [-windowHeight, 0, windowHeight / 1.2],
                outputRange: [1, 1, 0.4],
                extrapolate: 'clamp'
            }),
            transform: [{
                translateY: scrollY.interpolate({
                    inputRange: [ -windowHeight, 0, windowHeight],
                    outputRange: [windowHeight/2, 0, -50],
                    extrapolate: 'clamp'
                })
            },{
                scale: scrollY.interpolate({
                    inputRange: [ -windowHeight, 0, windowHeight],
                    outputRange: [2, 1, 1]
                })
            }]
          }}
          source={{uri: 'http://static.simpledesktops.com/uploads/desktops/2014/10/15/tetons-at-night.png'}}
        />
        <PageHeader navigation={this.props.navigation}/>
        {this.renderHeader()}
        <Animated.View style={{
          flex: 1,
          top: winWidth * 0.7 - 50,
          left: 0,
          right: 0,
          bottom: 0,
          height: winHeight,
          transform: [{
              translateY: scrollY.interpolate({
                  inputRange: [ -windowHeight, 0, windowHeight],
                  outputRange: [windowHeight - 50, 0, -windowHeight + 50],
                  extrapolate: 'clamp'
              }),
          }],
          backgroundColor: '#fff',
          zIndex: 99
        }}>
          <ScrollableTabView
            style={{flex: 1}}
            tabBarBackgroundColor="#fff"
            tabBarActiveTextColor="#343434"
            tabBarInactiveTextColor="#aaa"
            tabBarUnderlineStyle={{backgroundColor: '#343434'}}
            renderTabBar={() => <DefaultTabBar  style={{borderBottomColor: '#eee'}}/>}
          >
            <AnimatedSectionList
              style={{flex: 1}}
              sections={[{key: 1, title: 'about1', data: userInfo && userInfo.recent_topics || []}]}
              refreshing={isRefreshing}
              keyExtractor={(item, index) => index}
              renderItem={({item}) => this.renderItem(item)}
              onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY }}}],
                  { useNativeDriver: true }
              )}
              scrollEventThrottle={26}
              tabLabel={`最近发布${userInfo && userInfo.recent_topics && userInfo.recent_topics.length}`}
            />
            <AnimatedSectionList
              style={{flex: 1}}
              pageSize={4}
              sections={[{key: 2, title: 'about2', data: userInfo && userInfo.recent_replies || []}]}
              refreshing={isRefreshing}
              keyExtractor={(item, index) => index}
              renderItem={({item}) => this.renderItem(item)}
              onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY }}}],
                  { useNativeDriver: true }
              )}
              scrollEventThrottle={26}
              tabLabel={`最新回复${userInfo && userInfo.recent_replies && userInfo.recent_replies.length}`}
            />
          </ScrollableTabView>
        </Animated.View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 50,
  }
});


export default User;
