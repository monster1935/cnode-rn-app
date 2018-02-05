// Copyright (c) 2018 by monster1935. All Rights Reserved.
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducer';


import Home from './components/home';
import Favorite from './components/favorite';
import Message from './components/messages';
import Account from './components/account';
import Post from './components/home/Post';
import Login from './components/login';
import QrCode from './components/qrcode';
import Github from './components/github';
import Setting from './components/setting';
import About from './components/about';
import User from './components/user';
import SelfInfo from './components/account/SelfInfo';
import WebContainer from './components/webcontainer';
import storage from './utils/storage';
import { setToken, setUserInfo } from './redux/actions';

// 创建store 用于公共状态管理
const store = createStore(reducer,{
  token: '',
  userInfo: {},
});

// 读取登录token
storage.load({
  key: 'cnode',
  autoSync: true,
  syncInBackground: true,
})
.then(res => {
  console.log('获取用户信息成功：', res);
  if (res.token) {
    store.dispatch(setUserInfo(res.userInfo, res.token));
  }
})
.catch(e => {
  console.log(e);
});



const Tab  = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '主题',
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="md-home" size={24} color={tintColor}></Icon>
        )
      }),
    },
    Favorite: {
      screen: Favorite,
      navigationOptions: ({navigation}) => ({
        title: '收藏',
        tabBarLabel: '收藏',
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="md-bookmark" size={24} color={tintColor}></Icon>
        )
      }),
    },
    Messages: {
      screen: Message,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '消息',
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="md-folder" size={24} color={tintColor}></Icon>
        )
      }),
    },
    Account: {
      screen: Account,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="md-person" size={24} color={tintColor}></Icon>
        )
      }),
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    initialRouteName: 'Home',
    lazy: true,
    tabBarOptions: {
        activeTintColor: '#343434',
        inactiveTintColor: '#aaa',
        labelStyle: {
          fontSize: 12,
        },
        style: {
            backgroundColor: '#fff',
            height: 54,
            paddingBottom: 6,
            paddingTop: 6,
        }
    }
  }
);


const BasicApp = StackNavigator(
  {
    Tab: { screen: Tab },
    Post: { screen: Post },
    Login: { screen: Login },
    About: { screen: About },
    Setting: { screen: Setting },
    QrCode: { screen: QrCode },
    Github: { screen: Github },
    User: { screen: User },
    SelfInfo: { screen: SelfInfo },
    WebContainer: { screen: WebContainer },
  },
  {
    initialRouteName: 'Tab',
  }
);


class RootScene extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <BasicApp />
        </View>
      </Provider>

    )
  }
};

export default RootScene;
