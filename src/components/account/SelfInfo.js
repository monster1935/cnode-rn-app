// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 个人详情页
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback
} from 'react-native';
import { MaterialDialog } from 'react-native-material-dialog';
import { connect } from 'react-redux';
import storage from '../../utils/storage';
import { setToken, setUserInfo } from '../../redux/actions';

class SelfInfo extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '个人信息',
    headerTitleStyle: {
      fontSize: 20,
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
      userInfo: {},
      confirmVis: false,
    };
  }
  componentWillMount() {
    const { userInfo } = this.props.navigation.state.params;
    this.setState({userInfo});
  }

  handleOk() {
    // 1. remove 持久化存储中的记录
    storage.remove({
      key: 'cnode',
    });
    // 2. remove redux data
    const { navigation, dispatch } = this.props;
    dispatch(setUserInfo({}, ''));
    // 3. close the dialog
    this.setState({
      confirmVis: false,
    });
    // 4. navigate to account screen
    navigation.goBack();
  }

  handleLogout() {
    this.setState({
      confirmVis: true,
    });
  }

  render() {
    const { avatar_url, loginname, id, } = this.state.userInfo;
    return (
      <View style={styles.container}>
        <View style={[styles.listItem,{marginTop: 20,paddingTop: 10, paddingBottom: 10, height: 80}]}>
          <Text style={styles.listLabel}>头像</Text>
          <Image source={{uri: avatar_url}} style={{width: 70, height: 70}} />
        </View>
        <View style={[styles.listItem]}>
          <Text style={styles.listLabel}>昵称</Text>
          <Text>{loginname}</Text>
        </View>
        <View style={[styles.listItem]}>
          <Text style={styles.listLabel}>登录ID</Text>
          <Text>{id}</Text>
        </View>
        <View style={[styles.listItem, styles.btnLogin]}>
          <TouchableNativeFeedback onPress={this.handleLogout.bind(this)}>
            <View>
              <Text style={{color: 'red', fontSize: 16}}>退出帐号</Text>
            </View>
          </TouchableNativeFeedback>
        </View>

        <MaterialDialog
          title="CNode社区"
          visible={this.state.confirmVis}
          cancelLabel="取消"
          okLabel="确认"
          onOk={this.handleOk.bind(this)}
          onCancel={() => this.setState({ confirmVis: false})}
        >
          <Text>
            确定要注销登录吗？
          </Text>
        </MaterialDialog>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  listItem: {
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  listLabel: {
    fontSize: 16,
    color: '#333',
  },
  btnLogin: {
    marginTop: 120,
    justifyContent: 'center',
  }
})

export default connect()(SelfInfo);
