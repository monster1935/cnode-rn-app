// Copyright (c) 2018 by monster1935. All Rights Reserved.
// webview 组件，用于本地的html显示
import React, { Component } from 'react';
import {
  View,
  Text,
  WebView,
  Linking,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet';

const options = [ '刷新', '在浏览器中打开' ];

class WebContainer extends Component {

  static navigationOptions = ({navigation}) =>  ({
    title: navigation.state.params.url,
    headerLeft: (
      <TouchableNativeFeedback onPress={() => navigation.goBack()}>
        <View style={{width: 50, alignItems: 'center', height: '100%', justifyContent: 'center',}}>
          <Icon name="md-close" size={25} color="#FEFEFE" />
        </View>
      </TouchableNativeFeedback>
    ),
    headerRight: (
      <TouchableNativeFeedback onPress={() => {
          const scope = navigation.state.params.that;
          console.log(scope);
          scope.handlePressMore.call(scope);
      }}>
        <View style={{width: 50, alignItems: 'center', height: '100%', justifyContent: 'center',}}>
          <Icon name="md-more" size={25} color="#FEFEFE" />
        </View>
      </TouchableNativeFeedback>
    ),
    headerTitleStyle: {
      fontSize: 18,
      color: '#FEFEFE',
    },
    headerTintColor: '#FEFEFE',
    headerStyle: {
      backgroundColor: '#343434',
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      url: '',
    }
  }

  componentWillMount() {
    const { url } = this.props.navigation.state.params;
    this.setState({
      url,
    });
  }

  componentDidMount() {
    this.props.navigation.setParams({that: this});
  }

  // 更多按钮点击处理，弹出 actionsheet
  handlePressMore() {
    console.log(this);
    this.ActionSheet.show();
  }

  handlePressItem(i) {
    if (i === 0) {
      // reload
      this.webview.reload();
    } else if (i === 1) {
      // open link in the browser
      const { url } = this.props.navigation.state.params;
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          console.log('can\'t handle url: ' + url);
        } else {
          return Linking.openURL(url);
        }
      });
    }
  }

  render() {
    const { url } = this.state;
    return (
      <View style={{flex: 1,}}>
        <WebView
          ref={o => this.webview = o}
          source={{uri: url}}
          startInLoadingState={true}
        />
        <ActionSheet
          ref={ o => this.ActionSheet = o }
          options={options}
          onPress={this.handlePressItem.bind(this)}
        />

      </View>
    )
  }
};

export default WebContainer;
