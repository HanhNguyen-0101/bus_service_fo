import { call, put, takeLatest } from "redux-saga/effects";
import { STATUS_CODE } from "../../utils/configSetting";
import { NOTIF_TYPE, openNotification } from "../../utils/notification";
import { HIDE_DRAWER } from "../contants/DrawerConstant";
import { HIDE_LOADING, SHOW_LOADING } from "../contants/LoadingConstant";
import { ADD_VEHICLE_SAGA, DELETE_VEHICLE_SAGA, EDIT_VEHICLE_SAGA, FIND_VEHICLE_BY_ID, FIND_VEHICLE_BY_ID_SAGA, FIND_VEHICLE_BY_KEYWORD, FIND_VEHICLE_BY_KEYWORD_SAGA, FIND_VEHICLE_BY_TRIP_BUS, FIND_VEHICLE_BY_TRIP_BUS_SAGA, GET_ALL_VEHICLE, GET_ALL_VEHICLE_SAGA } from "../contants/VehicleConstant";
import { GlobalService } from "../services/GlobalManagementService";
import { SeatService } from "../services/SeatManagementService";
import { VehicleService } from "../services/VehicleManagementService";

function* getAllVehicleSaga() {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => VehicleService.getAllVehicle());
    const point = yield call(() => GlobalService.getAllPoint());
    const seats = yield call(() => SeatService.getAllSeat());

    if (status === STATUS_CODE.SUCCESS && point.status === STATUS_CODE.SUCCESS && seats.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_VEHICLE,
        payload: {vehicle: data, point: point.data, seats: seats.data},
      });
    } else {
      data.message && openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
      point.data.message && openNotification(NOTIF_TYPE.ERROR, point.data.message, point.data.content);
      seats.data.message && openNotification(NOTIF_TYPE.ERROR, seats.data.message, seats.data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* followGetAllVehicleSaga() {
  yield takeLatest(GET_ALL_VEHICLE_SAGA, getAllVehicleSaga);
}

function* addVehicleSaga(dataContent) {
  const vehicle = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      VehicleService.addVehicle(vehicle)
    );

    if (status === STATUS_CODE.CREATE) {
      yield call(() => getAllVehicleSaga());
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
export function* followAddVehicleSaga() {
  yield takeLatest(ADD_VEHICLE_SAGA, addVehicleSaga);
}

function* editVehicleSaga(dataContent) {
  const vehicle = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      VehicleService.editVehicle(vehicle)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllVehicleSaga());
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
export function* followEditVehicleSaga() {
  yield takeLatest(EDIT_VEHICLE_SAGA, editVehicleSaga);
}

function* deleteVehicleSaga(dataContent) {
  const VehicleId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      VehicleService.deleteVehicle(VehicleId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllVehicleSaga());
      openNotification(NOTIF_TYPE.SUCCESS, "A new vehicle is deleted", "");
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
export function* followDeleteVehicleSaga() {
  yield takeLatest(DELETE_VEHICLE_SAGA, deleteVehicleSaga);
}

function* findVehicleByIdSaga(dataContent) {
  const VehicleId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      VehicleService.findVehicleById(VehicleId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_VEHICLE_BY_ID,
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
export function* followFindVehicleByIdSaga() {
  yield takeLatest(FIND_VEHICLE_BY_ID_SAGA, findVehicleByIdSaga);
}

function* findVehicleByKeywordSaga(dataContent) {
  const keyword = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      VehicleService.findVehicleByKeyword(keyword)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_VEHICLE_BY_KEYWORD,
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
export function* followFindVehicleByKeywordSaga() {
  yield takeLatest(FIND_VEHICLE_BY_KEYWORD_SAGA, findVehicleByKeywordSaga);
}


function* findVehicleFollowTripDateSaga(dataContent) {
  const {fromId, toId, date} = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      VehicleService.findVehicleFollowTripDate(fromId, toId, date)
    );
    const point = yield call(() => GlobalService.getAllPoint());
    const seats = yield call(() => SeatService.getAllSeat());

    if (status === STATUS_CODE.SUCCESS && point.status === STATUS_CODE.SUCCESS && seats.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_VEHICLE_BY_TRIP_BUS,
        payload: {vehicle: data, point: point.data, seats: seats.data},
      });
    } else {
      data.message && openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
      point.data.message && openNotification(NOTIF_TYPE.ERROR, point.data.message, point.data.content);
      seats.data.message && openNotification(NOTIF_TYPE.ERROR, seats.data.message, seats.data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* followFindVehicleFollowTripDateSaga() {
  yield takeLatest(FIND_VEHICLE_BY_TRIP_BUS_SAGA, findVehicleFollowTripDateSaga);
}
