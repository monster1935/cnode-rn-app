// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 登录页面组件
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import AboutItem from './AboutItem';


class About extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '关于',
    headerTitleStyle: {
      fontSize: 20,
      color: '#FEFEFE',
    },
    headerTintColor: '#FEFEFE',
    headerStyle: {
      backgroundColor: '#343434',
    }
  })

  render() {
    const abouts = [
      {
        title: '当前版本',
        subTitle: '1.0.0',
        link: '',
      },
      {
        title: '项目开源主页',
        subTitle: 'https://github.com/monster1935/cnode-rn-app',
        link: 'https://github.com/monster1935/cnode-rn-app',
      },
      {
        title: '关于CNode社区',
        subTitle: 'https://cnodejs.org/about',
        link: 'https://cnodejs.org/about',
      },
      {
        title: '关于作者',
        subTitle: 'http://www.monster1935.site/about/',
        link: 'http://www.monster1935.site/about/',
      },
    ];
    return (
      <View style={styles.container}>
        <View>
          {
            abouts.map(el => (
              <AboutItem
                key={el.title}
                title={el.title}
                subTitle={el.subTitle}
                link={el.link}
              />
            ))
          }
          <View style={{marginTop: 10}}>
            <AboutItem
              title="意见反馈"
              subTitle="向作者发送电子邮件"
              link="mailto:liyb2014@163.com"
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Copyright (c) 2018 by monster1935.</Text>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'space-between',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 12,
  }
});

export default About;
