// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 顶部栏组件
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width;


class PageHeader extends Component {

  render() {
    const { navigation } = this.props;
    console.log('navigation: ', navigation);
    return (
      <View style={styles.container}>
        <TouchableNativeFeedback onPress={() => navigation.goBack()}>
          <View style={{paddingLeft: 20}}>
            <Icon name="ios-arrow-back" size={25} color='#fff' />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
};

const styles = StyleSheet.create({

  container: {
    height: 50,
    width: windowWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    zIndex: 99,
  }
});

export default PageHeader;
