// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 设置页面组件
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import { MaterialDialog } from 'react-native-material-dialog';
import { connect } from 'react-redux';
import storage from '../../utils/storage';
import { setToken, setUserInfo } from '../../redux/actions';

class Setting extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '设置',
    headerTitleStyle: {
      fontSize: 18,
      color: '#FEFEFE',
    },
    headerTintColor: '#FEFEFE',
    headerStyle: {
      backgroundColor: '#343434',
    }
  })

  constructor(props) {
    super(props);
    this.state = {
      confirmVis: false,
    };
  }


  handleLogout() {
    this.setState({
      confirmVis: true,
    });
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
    navigation.navigate('Account');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableNativeFeedback onPress={this.handleLogout.bind(this)}>
          <View style={styles.btnLogin}>
            <Text style={{color: '#eee'}}>退出登录</Text>
          </View>
        </TouchableNativeFeedback>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },

  btnLogin: {
    height: 40,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#343434',
  }
});

export default connect()(Setting);
