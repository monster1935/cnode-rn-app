// Copyright (c) 2018 by monster1935. All Rights Reserved.
// htmlview 自定义渲染 html 节点
export default function(node, index) {
  if (node.name == 'img') {
    const { src } = node.attribs;
    if (src) {
      let uri = src;
      console.log('src: ', src);
      if (!src.includes('http')) {
        uri = 'http:' + src;
      }
      return (
        <AutoSizedImage
          source={{uri: uri}}
          key={index}
          style={{width: 0, height: 0}}
        />
      )
    }
  }
}
