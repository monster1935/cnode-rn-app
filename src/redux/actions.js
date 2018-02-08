// Copyright (c) 2018 by monster1935. All Rights Reserved.
// redux actions


export const TYPE = {
    SET_TOKEN: 'SET_TOKEN',
    SET_USER_INFO: 'SET_USER_INFO',
    SET_POSTLIST: 'SET_POSTLIST',
};

// 设置全局token
export const setToken = token => {
  return {
    type: TYPE.SET_TOKEN,
    token,
  };
};

// 设置全局用户信息
export const setUserInfo = (userInfo,token) => ({
  type: TYPE.SET_USER_INFO,
  userInfo,
  token,
});

// 设置全局文章列表，用于客户端检索
export const setPostList = postList => {
  return {
    type: TYPE.SET_POSTLIST,
    postList,
  }
};
