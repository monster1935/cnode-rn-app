// Copyright (c) 2018 by monster1935. All Rights Reserved.
// redux reducers
import { TYPE } from './actions.js'

const reducer = (state = {}, action) => {
  console.log(action);
  switch(action.type) {
    case TYPE.SET_TOKEN:
      return { ...state, token: action.token };
    case TYPE.SET_USER_INFO:
      return { ...state, userInfo: action.userInfo };
    default:
      return { ...state };
  }
};

export default reducer;
