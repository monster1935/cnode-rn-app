// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 提示弹层组件
import React, { Component } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
} from 'react-native';

class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      innerText: '',
    };
  }

  componentWillMount() {
    this.setState({
      visible: this.props.visible,
      innerText: this.props.innerText,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.state.visible) {
      const { visible, innerText } = nextProps;
      this.setState({
        visible,
        innerText,
      }, () => {
        visible && setTimeout(() => {
          this.setState({
            visible: false,
          });
        }, 1700);
      });

    }
  }

  closeModal() {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Modal
          visible={this.state.visible}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}
          transparent={true}
        >
          <View style={styles.container}>
            <View style={styles.modalView}>
              <Text style={styles.innerText}>{this.state.innerText}</Text>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    width: 150,
    backgroundColor: '#000',
    borderRadius: 4,
    opacity: 0.7,
    padding: 10,
    marginBottom: 50,
  },
  innerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
  }

});

export default Message;
