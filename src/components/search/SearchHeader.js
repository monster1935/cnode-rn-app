// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 搜索组件头部组件
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

class SearchHeader  extends Component {

  handleSearch(text) {
    this.props.changeCb(text);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.back}>
          <TouchableNativeFeedback onPress={() => this.props.navigation.goBack()}>
            <View style={{width: 50, alignItems: 'center', height: '100%', justifyContent: 'center',}}>
              <Icon name="md-arrow-back" size={25} color='#FEFEFE' />
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.searchSection}>
          <Icon style={styles.searchIcon} name="md-search" size={20} color="#FEFEFE"/>
          <TextInput
            style={styles.input}
            placeholder="搜索"
            placeholderTextColor="#eee"
            onChangeText={(text) => {this.handleSearch(text)}}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#343434',
    width: width,
    flexDirection: 'row'
  },
  back: {
    width: 60,
  },
  searchSection: {
    width: width - 80,
    height: 46,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#343434',
    borderBottomWidth: 1,
    borderBottomColor: '#FEFEFE',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#343434',
    color: '#FEFEFE',
  },
});

export default SearchHeader;
