// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 二维码扫描组件
import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import QrCodeScan from '../common/QrCodeScan';

class QrCode extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '二维码',
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
  }

  handleQrResult(token) {
    console.log('扫码成功！~');

  }

  render() {
    return (
      <View style={{flex: 1}}>
        <QrCodeScan
          navigation={this.props.navigation}>
        </QrCodeScan>
      </View>
    )
  }
};

export default QrCode;
