// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 二维码扫描组件
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import Camera from 'react-native-camera';

class QrCodeScan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      moveAnim: new Animated.Value(0),
    };
    // 登录 token
    this.token = '';
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation() {
    this.state.moveAnim.setValue(0);
    Animated.timing(
      this.state.moveAnim,
      {
        toValue: -200,
        duration: 1500,
        easing: Easing.linear
      }
    ).start(() => this.startAnimation());
  }

  onBarCodeRead = (result) => {
    const { data } = result;
    if (this.token === '' || this.token !== data) {
      console.log('扫码成功！~ 跳转');
      this.token = data;
      this.props.navigation.navigate('Login', {data});
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Camera
          style={styles.preview}
          onBarCodeRead={this.onBarCodeRead}
        >

          <View style={styles.rectangleContainer}>

            <View style={styles.rectangle}></View>

            <Animated.View style={[styles.border, {transform: [{translateY: this.state.moveAnim}]}]}></Animated.View>

            <Text style={styles.rectangeText}>将二维码放入框内，即可自动扫描</Text>
          </View>

        </Camera>


      </View>
    );
  }
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
  },

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  rectangle: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderColor: '#00FF00',
    backgroundColor: 'transparent'
  },

  border: {
    flex: 0,
    width: 200,
    height: 2,
    backgroundColor: '#00FF00',

  },

  rectangeText: {
    flex: 0,
    color: '#fff',
    marginTop: 10
  },

});

export default QrCodeScan;
