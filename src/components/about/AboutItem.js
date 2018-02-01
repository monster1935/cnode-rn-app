// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 关于的相关条目组件
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Linking,
} from 'react-native';

class AboutItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      subTitle: '',
      link: '',
    }
  }

  componentWillMount() {
    const { title, subTitle, link } = this.props;
    this.setState({
      title,
      subTitle,
      link,
    });
  }

  handlePressLink(url) {
    if (!url) {
      return;
    }
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    const { title, link, subTitle } = this.state;
    return (
      <TouchableNativeFeedback onPress={this.handlePressLink.bind(this,link)}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
      </TouchableNativeFeedback>

    )
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    color: '#333',
  },
  link: {
    fontSize: 12,
  }
});

export default AboutItem;
