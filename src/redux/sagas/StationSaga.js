import { call, put, takeLatest } from "redux-saga/effects";
import { STATUS_CODE } from "../../utils/configSetting";
import { NOTIF_TYPE, openNotification } from "../../utils/notification";
import { HIDE_DRAWER } from "../contants/DrawerConstant";
import { HIDE_LOADING, SHOW_LOADING } from "../contants/LoadingConstant";
import {
  ADD_STATION_SAGA,
  DELETE_STATION_SAGA,
  EDIT_STATION_SAGA,
  FIND_STATION_BY_ID,
  FIND_STATION_BY_ID_SAGA,
  FIND_STATION_BY_KEYWORD,
  FIND_STATION_BY_KEYWORD_SAGA,
  GET_ALL_STATION,
  GET_ALL_STATION_SAGA,
} from "../contants/StationConstant";
import { StationService } from "../services/StationManagementService";

function* getAllStationSaga() {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => StationService.getAllStation());

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_STATION,
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
export function* followGetAllStationSaga() {
  yield takeLatest(GET_ALL_STATION_SAGA, getAllStationSaga);
}

function* addStationSaga(dataContent) {
  const station = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      StationService.addStation(station)
    );

    if (status === STATUS_CODE.CREATE) {
      yield call(() => getAllStationSaga());
      yield put({ type: HIDE_DRAWER });
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
export function* followAddStationSaga() {
  yield takeLatest(ADD_STATION_SAGA, addStationSaga);
}

function* editStationSaga(dataContent) {
  const station = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      StationService.editStation(station)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllStationSaga());
      yield put({ type: HIDE_DRAWER });
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
export function* followEditStationSaga() {
  yield takeLatest(EDIT_STATION_SAGA, editStationSaga);
}

function* deleteStationSaga(dataContent) {
  const stationId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      StationService.deleteStation(stationId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllStationSaga());
      openNotification(NOTIF_TYPE.SUCCESS, "A new station is deleted", "");
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
export function* followDeleteStationSaga() {
  yield takeLatest(DELETE_STATION_SAGA, deleteStationSaga);
}

function* findStationByIdSaga(dataContent) {
  const stationId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      StationService.findStationById(stationId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_STATION_BY_ID,
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
export function* followFindStationByIdSaga() {
  yield takeLatest(FIND_STATION_BY_ID_SAGA, findStationByIdSaga);
}

function* findStationByKeywordSaga(dataContent) {
  const keyword = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      StationService.findStationByKeyword(keyword)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_STATION_BY_KEYWORD,
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
export function* followFindStationByKeywordSaga() {
  yield takeLatest(FIND_STATION_BY_KEYWORD_SAGA, findStationByKeywordSaga);
}
