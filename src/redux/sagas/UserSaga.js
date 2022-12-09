import { call, put, takeLatest } from "redux-saga/effects";
import { STATUS_CODE } from "../../utils/configSetting";
import { USER_TYPE } from "../../utils/constant";
import { history } from "../../utils/history";
import { NOTIF_TYPE, openNotification } from "../../utils/notification";
import { HIDE_DRAWER } from "../contants/DrawerConstant";
import { HIDE_LOADING, SHOW_LOADING } from "../contants/LoadingConstant";
import {
  ADD_USER_SAGA,
  DELETE_USER_SAGA,
  EDIT_USER_SAGA,
  FIND_USERS_BY_KEYWORD,
  FIND_USERS_BY_KEYWORD_SAGA,
  FIND_USER_BY_ID,
  FIND_USER_BY_ID_SAGA,
  GET_USERS,
  GET_USERS_SAGA,
  LOGIN,
  LOGIN_SAGA,
  REGISTER_SAGA,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SAGA,
} from "../contants/UserConstant";
import { UserService } from "../services/UserManagementService";

function* loginSaga(dataContent) {
  const user = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => UserService.login(user));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: LOGIN,
        payload: data,
      });
      if (data?.user.typeObj.name === USER_TYPE.ADMIN) {
        history.push("/admin/");
      } else {
        history.push("/");
      }
      window.location.reload();
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* followLoginSaga() {
  yield takeLatest(LOGIN_SAGA, loginSaga);
}

function* registerSaga(dataContent) {
  const user = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => UserService.register(user));

    if (status === STATUS_CODE.CREATE) {
      history.push("/login");
      window.location.reload();
      openNotification(
        NOTIF_TYPE.SUCCESS,
        "SUCCESSFULLY",
        "Congratulations! You are just a member of AliBus!!!"
      );
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* followRegisterSaga() {
  yield takeLatest(REGISTER_SAGA, registerSaga);
}

function* getAllUserSaga() {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => UserService.getAllUser());

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USERS,
        payload: data,
      });
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* followGetAllUserSaga() {
  yield takeLatest(GET_USERS_SAGA, getAllUserSaga);
}

function* addUserSaga(dataContent) {
  const user = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => UserService.addUser(user));

    if (status === STATUS_CODE.CREATE) {
      yield call(() => getAllUserSaga());
      yield put({type: HIDE_DRAWER});
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* followAddUserSaga() {
  yield takeLatest(ADD_USER_SAGA, addUserSaga);
}

function* editUserSaga(dataContent) {
  const user = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => UserService.editUser(user));

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllUserSaga());
      yield put({type: HIDE_DRAWER});
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* followEditUserSaga() {
  yield takeLatest(EDIT_USER_SAGA, editUserSaga);
}

function* updateProfileSaga(dataContent) {
  const user = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => UserService.editUser(user));

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: UPDATE_PROFILE,
        payload: data
      });
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* followUpdateProfileSaga() {
  yield takeLatest(UPDATE_PROFILE_SAGA, updateProfileSaga);
}

function* deleteUserSaga(dataContent) {
  const userId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => UserService.deleteUser(userId));

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllUserSaga());
      openNotification(NOTIF_TYPE.SUCCESS, "A new user is deleted", "");
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* followDeleteUserSaga() {
  yield takeLatest(DELETE_USER_SAGA, deleteUserSaga);
}

function* getUserByIdSaga(dataContent) {
  const userId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => UserService.getUserById(userId));

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_USER_BY_ID,
        payload: data
      });
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* followGetUserByIdSaga() {
  yield takeLatest(FIND_USER_BY_ID_SAGA, getUserByIdSaga);
}

function* getUserByKeywordSaga(dataContent) {
  const keyword = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => UserService.getUserByKeyword(keyword));

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_USERS_BY_KEYWORD,
        payload: data
      });
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* followGetUserByKeywordSaga() {
  yield takeLatest(FIND_USERS_BY_KEYWORD_SAGA, getUserByKeywordSaga);
}
