import { call, put, takeLatest } from "redux-saga/effects";
import { STATUS_CODE } from "../../utils/configSetting";
import { NOTIF_TYPE, openNotification } from "../../utils/notification";
import {
  ADD_BUS_COMPANY_SAGA,
  DELETE_BUS_COMPANY_SAGA,
  EDIT_BUS_COMPANY_SAGA,
  FIND_BUS_COMPANY_BY_ID,
  FIND_BUS_COMPANY_BY_ID_SAGA,
  FIND_BUS_COMPANY_BY_KEYWORD,
  FIND_BUS_COMPANY_BY_KEYWORD_SAGA,
  GET_BUS_COMPANY,
  GET_BUS_COMPANY_SAGA,
} from "../contants/BusCompanyConstant";
import { HIDE_DRAWER } from "../contants/DrawerConstant";
import { HIDE_LOADING, SHOW_LOADING } from "../contants/LoadingConstant";
import { BusCompanyService } from "../services/BusCompanyManagementService";

function* getAllBusCompanySaga() {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      BusCompanyService.getAllBusCompany()
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_BUS_COMPANY,
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
export function* followGetAllBusCompanySaga() {
  yield takeLatest(GET_BUS_COMPANY_SAGA, getAllBusCompanySaga);
}

function* addBusCompanySaga(dataContent) {
  const company = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      BusCompanyService.addBusCompany(company)
    );

    if (status === STATUS_CODE.CREATE) {
      yield call(() => getAllBusCompanySaga());
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
export function* followAddBusCompanySaga() {
  yield takeLatest(ADD_BUS_COMPANY_SAGA, addBusCompanySaga);
}

function* editBusCompanySaga(dataContent) {
  const company = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      BusCompanyService.editBusCompany(company)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllBusCompanySaga());
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
export function* followEditBusCompanySaga() {
  yield takeLatest(EDIT_BUS_COMPANY_SAGA, editBusCompanySaga);
}

function* deleteBusCompanySaga(dataContent) {
  const companyId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      BusCompanyService.deleteBusCompany(companyId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllBusCompanySaga());
      openNotification(NOTIF_TYPE.SUCCESS, "A new bus company is deleted", "");
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
export function* followDeleteBusCompanySaga() {
  yield takeLatest(DELETE_BUS_COMPANY_SAGA, deleteBusCompanySaga);
}

function* findBusCompanyByIdSaga(dataContent) {
  const companyId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      BusCompanyService.findBusCompanyById(companyId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_BUS_COMPANY_BY_ID,
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
export function* followFindBusCompanyByIdSaga() {
  yield takeLatest(FIND_BUS_COMPANY_BY_ID_SAGA, findBusCompanyByIdSaga);
}

function* findBusCompanyByKeywordSaga(dataContent) {
  const keyword = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      BusCompanyService.findBusCompanyByKeyword(keyword)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_BUS_COMPANY_BY_KEYWORD,
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
export function* followFindBusCompanyByKeywordSaga() {
  yield takeLatest(FIND_BUS_COMPANY_BY_KEYWORD_SAGA, findBusCompanyByKeywordSaga);
}
