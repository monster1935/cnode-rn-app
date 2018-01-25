// Copyright (c) 2018 by monster1935. All Rights Reserved.
// redux actions

export const TYPE = {
    SET_TOKEN: 'SET_TOKEN',
    SET_USER_INFO: 'SET_USER_INFO',
};

// 设置全局token
export const setToken = token => {
  console.log(token);
  return {
    type: TYPE.SET_TOKEN,
    token,
  };
};

// 设置全局用户信息
export const setUserInfo = userInfo => ({
  type: TYPE.SET_USER_INFO,
  userInfo,
});
