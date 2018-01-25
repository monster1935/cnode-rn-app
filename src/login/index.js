// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 登录页面组件
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { connect } from 'react-redux';
import { MaterialDialog } from 'react-native-material-dialog';
import { setToken, setUserInfo } from '../redux/actions';
import Message from '../common/Message';

class Login extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '登录',
    headerTitleStyle: {
      fontSize: 16,
      color: '#FEFEFE',
    },
    headerTintColor: '#FEFEFE',
    headerStyle: {
      backgroundColor: '#343434',
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      userInfo: {},
      modalVisible: false,
      infoText: '',
      helpVis: false,
      helpText: '用户登录后，在设置页面可以看到自己的 accessToken。 建议各移动端应用使用手机扫码的形式登录，验证使用 /accesstoken 接口，登录后长期保存 accessToken。'
    };
  }

  componentWillMount() {
    console.log(this.props);
  }

  checkLogin() {
    const { token } = this.state;
    return axios.post('https://cnodejs.org/api/v1/accesstoken', {
      accesstoken: token
    });
  }

  onPressLogin() {
    console.log('login press');
    this.checkLogin()
    .then(res => {
      const data = res.data;
      if (res.status === 200) {
        // login success
        this.setState({
          userInfo: data,
        }, () => {
          const { navigation, dispatch } = this.props;
          // 1. modify the global state
          dispatch(setToken(this.state.token));
          dispatch(setUserInfo(this.state.userInfo));
          // 2. navigate to the previous screen
          navigation.goBack();
        });
      }
    })
    .catch(e => {
      // login failed
      const { error_msg } = e.response.data;
      this.setState({
        infoText: error_msg,
        modalVisible: true,
      });
    });
  }

  onPressQrLogin() {
    console.log('qr login');
  }

  onPressGitLogin() {
    console.log('github login');
  }

  onPressHelp() {
    this.setState({
      helpVis: true,
      modalVisible: false,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{width: 200}}>
          <View style={{marginBottom: 10}}>
            <Text style={{textAlign: 'center',fontSize: 16, marginBottom: 20 }}>Token登录</Text>
            <TextInput
              style={{height: 40}}
              placeholder="输入 Access Token"
              onChangeText={(token) => this.setState({token})}
            />
          </View>

          <View style={{marginBottom: 20}}>
            <TouchableNativeFeedback onPress={this.onPressLogin.bind(this)}>
              <View style={styles.btnLogin}>
                <Text style={{color: '#eee'}}>登录</Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
            <TouchableNativeFeedback onPress={this.onPressQrLogin.bind(this)}>
              <View style={styles.loginWay}>
                <Icon name="md-qr-scanner" size={22} color="#666" style={{marginRight: 6}}/>
                <Text>扫码登录</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={this.onPressGitLogin.bind(this)}>
              <View style={styles.loginWay}>
                <Icon name="logo-github" size={22} color="#666" style={{marginRight: 6}}/>
                <Text>Github登录</Text>
              </View>
            </TouchableNativeFeedback>

          </View>

          <View>
            <TouchableNativeFeedback onPress={this.onPressHelp.bind(this)}>
              <View>
                <Text style={{textAlign: 'center', fontSize: 12, color: '#343434',textDecorationLine: 'underline'}}>
                  如何获取Access Token?
                </Text>
              </View>
            </TouchableNativeFeedback>

          </View>

        </View>


        <Message
          visible={this.state.modalVisible}
          innerText={this.state.infoText}
        />

        <MaterialDialog
          title="提示"
          visible={this.state.helpVis}
          onOk={() => this.setState({ helpVis: false})}
          onCancel={() => this.setState({ helpVis: false})}
        >
          <Text>
            {this.state.helpText}
          </Text>
        </MaterialDialog>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  btnLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 200,
    backgroundColor: '#343434',
  },
  loginWay: {
    flexDirection: 'row',
  },
});

export default connect()(Login);