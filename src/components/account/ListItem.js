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
      <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', paddingTop: 11, paddingBottom: 11, alignItems: 'center'}}>
        <Icon name={icon} size={20} color={"#343434"} style={{width: 30}}></Icon>
        <Text style={{fontSize: 16}}>{title}</Text>
      </View>
    )
  }
};

export default ListItem;
