// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 搜索组件
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import PostItem from '../home/PostItem';
import SearchHeader from './SearchHeader';

class Search extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      postList: this.props.postList,
      filterList: [],
    }
  }

  handleSearch(text) {
    // filter the post list
    if (text !== '') {
      const { postList } = this.state;
      let res = postList.filter((el) => {
        return el.title.includes(text);
      });
      this.setState({
        filterList: res,
      });
    } else {
      this.setState({ filterList: []});
    }
  }

  renderItem = ({item, index}) => (
    <TouchableNativeFeedback
      onPress={() => {this.props.navigation.navigate('Post', {postInfo: item})}}
    >
      <View>
        <PostItem
          item={item}
          index={index}
        />
      </View>
    </TouchableNativeFeedback>
  )

  render() {
    const { filterList } = this.state;
    const { navigation } = this.props;
    return (
      <View style={{flex: 1,backgroundColor: '#eee'}}>
        <SearchHeader changeCb={this.handleSearch.bind(this)} navigation={navigation} />
        <View style={{paddingTop: 20}}>
          <FlatList
            data={filterList}
            removeClippedSubviews={false}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    )
  }
};

const mapStateToProps = ({ postList }) => ({
  postList,
});

export default connect(mapStateToProps)(Search);
