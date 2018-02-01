// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 内联图片组件，用于展示嵌套在 Text 组件内部的图片，android设备上存在显示图片过小问题
import React from 'react';
import {
  StyleSheet,
  Image,
  Platform,
  PixelRatio,
} from 'react-native';

// This component fixes a bug in React Native with <Image> component inside of
// <Text> components.
const InlineImage = (props) => {
  let style = props.style;
  if (style && Platform.OS !== 'ios') {
    // Multiply width and height by pixel ratio to fix React Native bug
    style = Object.assign({}, StyleSheet.flatten(props.style));
    ['width', 'height'].forEach((propName) => {
      if (style[propName]) {
        style[propName] *= PixelRatio.get();
      }
    });
  }

  return (
    <Image
      {...props}
      style={style}
    />
  );
};

// "Inherit" prop types from Image
InlineImage.propTypes = Image.propTypes;

export default InlineImage;
