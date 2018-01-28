// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 鉴权相关
//
// 1. 根据持久化存储中的 cnode key进行判断是否已经登录

import storage from './storage';

const getAuthInfo = () => {
  storage.load({
    key: 'cnode',
  })
  .then(res => {
    if (res.token) {
      return true;
    }
    return false;
  }).catch(() => {
    return false;
  })
  return false;
};

export default getAuthInfo;
