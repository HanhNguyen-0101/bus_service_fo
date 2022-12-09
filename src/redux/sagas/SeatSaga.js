import { call, put, takeLatest } from "redux-saga/effects";
import { STATUS_CODE } from "../../utils/configSetting";
import { NOTIF_TYPE, openNotification } from "../../utils/notification";
import { HIDE_DRAWER } from "../contants/DrawerConstant";
import { HIDE_LOADING, SHOW_LOADING } from "../contants/LoadingConstant";
import {
  ADD_SEAT_SAGA,
  DELETE_SEAT_SAGA,
  EDIT_SEAT_SAGA,
  FIND_SEAT_BY_ID,
  FIND_SEAT_BY_ID_SAGA,
  FIND_SEAT_BY_KEYWORD,
  FIND_SEAT_BY_KEYWORD_SAGA,
  GET_ALL_SEAT,
  GET_ALL_SEAT_SAGA,
} from "../contants/SeatConstant";
import { SeatService } from "../services/SeatManagementService";

function* getAllSeatSaga() {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => SeatService.getAllSeat());

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_SEAT,
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
export function* followGetAllSeatSaga() {
  yield takeLatest(GET_ALL_SEAT_SAGA, getAllSeatSaga);
}

function* addSeatSaga(dataContent) {
  const seat = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => SeatService.addSeat(seat));

    if (status === STATUS_CODE.CREATE) {
      yield call(() => getAllSeatSaga());
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
export function* followAddSeatSaga() {
  yield takeLatest(ADD_SEAT_SAGA, addSeatSaga);
}

function* editSeatSaga(dataContent) {
  const seat = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => SeatService.editSeat(seat));

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllSeatSaga());
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
export function* followEditSeatSaga() {
  yield takeLatest(EDIT_SEAT_SAGA, editSeatSaga);
}

function* deleteSeatSaga(dataContent) {
  const seatId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => SeatService.deleteSeat(seatId));

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllSeatSaga());
      openNotification(NOTIF_TYPE.SUCCESS, "A new seat is deleted", "");
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
export function* followDeleteSeatSaga() {
  yield takeLatest(DELETE_SEAT_SAGA, deleteSeatSaga);
}

function* findSeatByIdSaga(dataContent) {
  const seatId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => SeatService.findSeatById(seatId));

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_SEAT_BY_ID,
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
export function* followFindSeatByIdSaga() {
  yield takeLatest(FIND_SEAT_BY_ID_SAGA, findSeatByIdSaga);
}

function* findSeatByKeywordSaga(dataContent) {
  const keyword = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      SeatService.findSeatByKeyword(keyword)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_SEAT_BY_KEYWORD,
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
export function* followFindSeatByKeywordSaga() {
  yield takeLatest(FIND_SEAT_BY_KEYWORD_SAGA, findSeatByKeywordSaga);
}
