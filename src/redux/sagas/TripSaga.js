import { call, put, takeLatest } from "redux-saga/effects";
import { STATUS_CODE } from "../../utils/configSetting";
import { NOTIF_TYPE, openNotification } from "../../utils/notification";
import { HIDE_DRAWER } from "../contants/DrawerConstant";
import { HIDE_LOADING, SHOW_LOADING } from "../contants/LoadingConstant";
import { ADD_TRIP_SAGA, DELETE_TRIP_SAGA, EDIT_TRIP_SAGA, FIND_TRIP_BY_ID, FIND_TRIP_BY_ID_SAGA, FIND_TRIP_BY_KEYWORD, FIND_TRIP_BY_KEYWORD_SAGA, GET_TRIP, GET_TRIP_SAGA } from "../contants/TripConstant";
import { TripService } from "../services/TripManagementService";

function* getTripSaga() {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => TripService.getAllTrip());

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TRIP,
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
export function* followGetTripSaga() {
  yield takeLatest(GET_TRIP_SAGA, getTripSaga);
}

function* addTripSaga(dataContent) {
  const trip = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      TripService.addTrip(trip)
    );

    if (status === STATUS_CODE.CREATE) {
      yield call(() => getTripSaga());
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
export function* followAddTripSaga() {
  yield takeLatest(ADD_TRIP_SAGA, addTripSaga);
}

function* editTripSaga(dataContent) {
  const trip = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      TripService.editTrip(trip)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getTripSaga());
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
export function* followEditTripSaga() {
  yield takeLatest(EDIT_TRIP_SAGA, editTripSaga);
}

function* deleteTripSaga(dataContent) {
  const tripCompanyId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      TripService.deleteTrip(tripCompanyId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getTripSaga());
      openNotification(NOTIF_TYPE.SUCCESS, "A new trip is deleted", "");
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
export function* followDeleteTripSaga() {
  yield takeLatest(DELETE_TRIP_SAGA, deleteTripSaga);
}

function* findTripByIdSaga(dataContent) {
  const tripCompanyId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      TripService.findTripById(tripCompanyId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_TRIP_BY_ID,
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
export function* followFindTripByIdSaga() {
  yield takeLatest(FIND_TRIP_BY_ID_SAGA, findTripByIdSaga);
}

function* findTripByKeywordSaga(dataContent) {
  const keyword = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      TripService.findTripByKeyword(keyword)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_TRIP_BY_KEYWORD,
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
export function* followFindTripByKeywordSaga() {
  yield takeLatest(FIND_TRIP_BY_KEYWORD_SAGA, findTripByKeywordSaga);
}
