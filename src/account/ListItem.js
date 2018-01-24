// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 列表展示组件
import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: '',
      title: '',
    };
  }
  componentWillMount() {
    const {icon, title} = this.props;
    this.setState(
      {
        icon,
        title
      }
    );
  }

  render() {
    const { title, icon } = this.state;
    return (
      <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', paddingTop: 10, paddingBottom: 10, alignItems: 'center'}}>
        <Icon name={icon} size={20} color={"#000"} style={{width: 30}}></Icon>
        <Text>{title}</Text>
      </View>
    )
  }
};

export default ListItem;
