// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 消息组件
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import messagesJson from '../assets/json/messages.json';
import MsgItem from './MsgItem';

const dev = true;

class Messages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      msgs: [],
      isRefreshing: true,
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: '消息',
    headerTitleStyle: {
      fontSize: 18,
      color: '#FEFEFE',
    },
    headerTintColor: '#FEFEFE',
    headerStyle: {
      backgroundColor: '#343434',
    }
  })


  componentWillMount() {
    const { token } = this.props;
    this.setState({
      token,
    });
    if (token !== '') {
      this.getData(token);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { token } = nextProps;
    this.setState({
      token,
    });
    if (token !== '') {
      this.getData(token);
    }
  }

  getFormatValue(arr) {
    arr.forEach(el => {
      el.key = el.id;
    });
    return arr;
  }

  getData(token) {
    if (dev) {
      const { has_read_messages, hasnot_read_messages} = messagesJson.data;
      const msgs = this.getFormatValue( has_read_messages.concat(hasnot_read_messages));
      console.log('msgs: ', msgs);
      this.setState({
        msgs,
        isRefreshing: false,
      });
    } else {
      axios.get('https://cnodejs.org/api/v1/messages', {
        params: {
          accesstoken: token,
        }
      }).then(res => {
        this.setState({
          isRefreshing: false,
        });
        const data = res.data;
        if (res.status === 200) {
          const msgs = this.getFormatValue( has_read_messages.concat(hasnot_read_messages));
          this.setState({
            msgs,
          });
        } else {
          console.warn(res.statusText);
        }
      });
    }

  }

  handleLoginPress () {
    // navigate to Login screen
    const { navigation } = this.props;
    navigation.navigate('Login');
  }

  renderItem({item, index}) {
    console.log(item);
    return (
      <View style={{flex: 1}}>
        <MsgItem item={item} index={index} />
      </View>
    )
  }

  render() {
    const { token,} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#eee'}}>
        {
          token === '' ?
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>该模块需要登录账户</Text>
            <TouchableNativeFeedback onPress={this.handleLoginPress.bind(this)}>
              <View style={styles.btnLogin}>
                <Text style={{color: '#eee'}}>去登录</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          :
          <View style={{flex: 1}}>
            <FlatList
              data={this.state.msgs}
              onRefresh={this.getData.bind(this)}
              removeClippedSubviews={false}
              refreshing={this.state.isRefreshing}
              ListFooterComponent={() => <Text style={{textAlign: 'center', padding: 10, transform: [{scale: 0.857143}]}}>已加载全部数据</Text>}
              renderItem={this.renderItem}
            />
          </View>
        }
      </View>
    )
  }
};

const styles = StyleSheet.create({
  btnLogin: {
    height: 40,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#343434',
    marginTop: 20,
  }
});

const mapStateToProps = ({ token, userInfo }) => ({
    token,
});

export default connect(mapStateToProps)(Messages);
