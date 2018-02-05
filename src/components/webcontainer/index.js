// Copyright (c) 2018 by monster1935. All Rights Reserved.
// webview 组件，用于本地的html显示
import React, { Component } from 'react';
import {
  View,
  Text,
  WebView,
  Linking,
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet';
import * as Progress from 'react-native-progress';


const windowWidth = Dimensions.get('window').width;
const options = [ '刷新', '在浏览器中打开' ];
const timer = null;

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
      progress: 0,
      loading: true,
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

  handleLoadStart() {
    const { progress } = this.state;
    timer = setInterval(() => {
      if (progress > 1) {
        this.setState({progress: 1});
        clearInterval(timer);
      } else {
        this.setState({
          progress: progress + 0.3
        })
      }
    }, 200);
  }

  handleLoadEnd() {
    this.setState({progress: 1});
    this.setState({loading: false});
    clearInterval(timer);
  }

  render() {
    const { url, progress, loading } = this.state;
    return (
      <View style={{flex: 1,}}>
        {
          loading ?
          (
            <Progress.Bar
              progress={progress}
              width={windowWidth}
              borderRadius={0}
              borderWidth={0}
              height={4}
            />
          )
          :
          (
            null
          )
        }
        <WebView
          ref={o => this.webview = o}
          source={{uri: url}}
          startInLoadingState={true}
          onLoadStart={this.handleLoadStart.bind(this)}
          onLoadEnd={this.handleLoadEnd.bind(this)}
        >
        </WebView>
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
