import { User } from "../../models/UserModel";
import { TOKEN, USER_LOGIN } from "../../utils/configSetting";
import {
  FIND_USERS_BY_KEYWORD,
  FIND_USER_BY_ID,
  GET_USERS,
  LOGIN,
  LOGOUT,
  UPDATE_PROFILE,
} from "../contants/UserConstant";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin: user,
  userList: [],
  userSelected: {},
};

export const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN: {
      const userData = new User(payload.user);
      localStorage.setItem(USER_LOGIN, JSON.stringify(userData));
      localStorage.setItem(TOKEN, payload.token);
      return { ...state, userLogin: userData };
    }
    case LOGOUT: {
      localStorage.removeItem(USER_LOGIN);
      localStorage.removeItem(TOKEN);
      window.location.reload();
      return { ...state, userLogin: {} };
    }
    case UPDATE_PROFILE: {
      const userData = new User(payload);
      localStorage.setItem(USER_LOGIN, JSON.stringify(userData));
      return { ...state, userLogin: userData };
    }
    case GET_USERS: {
      return { ...state, userList: payload?.map(i => new User(i)) };
    }
    case FIND_USER_BY_ID: {
      return { ...state, userSelected: new User(payload) };
    }
    case FIND_USERS_BY_KEYWORD: {
      return { ...state, userList: payload?.map(i => new User(i)) };
    }
    default:
      return state;
  }
};
