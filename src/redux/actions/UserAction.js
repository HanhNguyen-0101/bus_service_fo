import {
  ADD_USER_SAGA,
  DELETE_USER_SAGA,
  EDIT_USER_SAGA,
  FIND_USERS_BY_KEYWORD_SAGA,
  FIND_USER_BY_ID_SAGA,
  GET_USERS_SAGA,
  LOGIN_SAGA,
  LOGOUT,
  REGISTER_SAGA,
  UPDATE_PROFILE_SAGA,
} from "../contants/UserConstant";

export const login = ({ email, password }) => ({
  type: LOGIN_SAGA,
  payload: { email, password },
});

export const register = ({ name, email, password, numberPhone, avatar, type }) => ({
  type: REGISTER_SAGA,
  payload: { name, email, password, numberPhone, avatar, type },
});

export const logout = () => ({
  type: LOGOUT,
});

export const getAllUser = () => ({
  type: GET_USERS_SAGA,
});

export const addUser = (data) => ({
  type: ADD_USER_SAGA,
  payload: data,
});

export const editUser = (data) => ({
  type: EDIT_USER_SAGA,
  payload: data,
});

export const updateProfile = (data) => ({
  type: UPDATE_PROFILE_SAGA,
  payload: data,
});

export const deleteUser = ({ id }) => ({
  type: DELETE_USER_SAGA,
  payload: { id },
});

export const getUserById = ({ id }) => ({
  type: FIND_USER_BY_ID_SAGA,
  payload: { id },
});

export const getUserByKeyword = (keyword) => ({
  type: FIND_USERS_BY_KEYWORD_SAGA,
  payload: { keyword },
});
