import { call, put, takeLatest } from "redux-saga/effects";
import { STATUS_CODE } from "../../utils/configSetting";
import { NOTIF_TYPE, openNotification } from "../../utils/notification";
import { HIDE_DRAWER } from "../contants/DrawerConstant";
import {
  ADD_ARTICLE_SAGA,
  ADD_BANNER_SAGA,
  ADD_BUSTYPE_SAGA,
  ADD_HASHTAG_SAGA,
  ADD_ORDER_STATUS_SAGA,
  ADD_PAYMENT_METHOD_SAGA,
  ADD_PAYMENT_STATUS_SAGA,
  ADD_POINT_SAGA,
  ADD_PROVINCE_SAGA,
  ADD_STATUS_SAGA,
  ADD_USERTYPE_SAGA,
  DELETE_ARTICLE_SAGA,
  DELETE_BANNER_SAGA,
  DELETE_BUSTYPE_SAGA,
  DELETE_HASHTAG_SAGA,
  DELETE_ORDER_STATUS_SAGA,
  DELETE_PAYMENT_METHOD_SAGA,
  DELETE_PAYMENT_STATUS_SAGA,
  DELETE_POINT_SAGA,
  DELETE_PROVINCE_SAGA,
  DELETE_STATUS_SAGA,
  DELETE_USERTYPE_SAGA,
  EDIT_ARTICLE_SAGA,
  EDIT_BANNER_SAGA,
  EDIT_BUSTYPE_SAGA,
  EDIT_HASHTAG_SAGA,
  EDIT_ORDER_STATUS_SAGA,
  EDIT_PAYMENT_METHOD_SAGA,
  EDIT_PAYMENT_STATUS_SAGA,
  EDIT_POINT_SAGA,
  EDIT_PROVINCE_SAGA,
  EDIT_STATUS_SAGA,
  EDIT_USERTYPE_SAGA,
  FIND_ARTICLE_BY_HASHTAG_AND_TITLE,
  FIND_ARTICLE_BY_HASHTAG_AND_TITLE_SAGA,
  FIND_ARTICLE_BY_ID,
  FIND_ARTICLE_BY_ID_SAGA,
  FIND_BANNER_BY_ID,
  FIND_BANNER_BY_ID_SAGA,
  FIND_BUSTYPE_BY_ID,
  FIND_BUSTYPE_BY_ID_SAGA,
  FIND_HASHTAG_BY_ID,
  FIND_HASHTAG_BY_ID_SAGA,
  FIND_HASHTAG_BY_NAME,
  FIND_HASHTAG_BY_NAME_SAGA,
  FIND_ORDER_STATUS_BY_ID,
  FIND_ORDER_STATUS_BY_ID_SAGA,
  FIND_PAYMENT_METHOD_BY_ID,
  FIND_PAYMENT_METHOD_BY_ID_SAGA,
  FIND_PAYMENT_STATUS_BY_ID,
  FIND_PAYMENT_STATUS_BY_ID_SAGA,
  FIND_POINT_BY_ID,
  FIND_POINT_BY_ID_SAGA,
  FIND_PROVINCE_BY_ID,
  FIND_PROVINCE_BY_ID_SAGA,
  FIND_STATUS_BY_ID,
  FIND_STATUS_BY_ID_SAGA,
  FIND_USERTYPE_BY_ID,
  FIND_USERTYPE_BY_ID_SAGA,
  GET_ALL_BANNER,
  GET_ALL_BANNER_SAGA,
  GET_ALL_BUSTYPE,
  GET_ALL_BUSTYPE_SAGA,
  GET_ALL_HASHTAG,
  GET_ALL_HASHTAG_SAGA,
  GET_ALL_ORDER_STATUS,
  GET_ALL_ORDER_STATUS_SAGA,
  GET_ALL_PAYMENT_METHOD,
  GET_ALL_PAYMENT_METHOD_SAGA,
  GET_ALL_PAYMENT_STATUS,
  GET_ALL_PAYMENT_STATUS_SAGA,
  GET_ALL_POINT,
  GET_ALL_POINT_SAGA,
  GET_ALL_PROVINCE,
  GET_ALL_PROVINCE_SAGA,
  GET_ALL_STATUS,
  GET_ALL_STATUS_SAGA,
  GET_ALL_USERTYPE,
  GET_ALL_USERTYPE_SAGA,
  GET_ARTICLE,
  GET_ARTICLE_SAGA,
} from "../contants/GlobalConstant";
import { HIDE_LOADING, SHOW_LOADING } from "../contants/LoadingConstant";
import { GlobalService } from "../services/GlobalManagementService";

/**************************BANNER*****************************/
function* getAllBannerSaga() {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => GlobalService.getAllBanner());

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_BANNER,
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
export function* followGetAllBannerSaga() {
  yield takeLatest(GET_ALL_BANNER_SAGA, getAllBannerSaga);
}

function* addBannerSaga(dataContent) {
  const banner = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => GlobalService.addBanner(banner));

    if (status === STATUS_CODE.CREATE) {
      yield call(() => getAllBannerSaga());
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
export function* followAddBannerSaga() {
  yield takeLatest(ADD_BANNER_SAGA, addBannerSaga);
}

function* editBannerSaga(dataContent) {
  const banner = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => GlobalService.editBanner(banner));

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllBannerSaga());
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
export function* followEditBannerSaga() {
  yield takeLatest(EDIT_BANNER_SAGA, editBannerSaga);
}

function* deleteBannerSaga(dataContent) {
  const bannerId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.deleteBanner(bannerId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllBannerSaga());
      openNotification(NOTIF_TYPE.SUCCESS, "A new banner is deleted", "");
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
export function* followDeleteBannerSaga() {
  yield takeLatest(DELETE_BANNER_SAGA, deleteBannerSaga);
}

function* findBannerByIdSaga(dataContent) {
  const bannerId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.getBannerById(bannerId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_BANNER_BY_ID,
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
export function* followFindBannerByIdSaga() {
  yield takeLatest(FIND_BANNER_BY_ID_SAGA, findBannerByIdSaga);
}

/**************************HASHTAG*****************************/
function* getAllHashtagSaga() {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => GlobalService.getAllHashtag());

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_HASHTAG,
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
export function* followGetAllHashtagSaga() {
  yield takeLatest(GET_ALL_HASHTAG_SAGA, getAllHashtagSaga);
}

function* addHashtagSaga(dataContent) {
  const hashtag = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.addHashtag(hashtag)
    );

    if (status === STATUS_CODE.CREATE) {
      yield call(() => getAllHashtagSaga());
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
export function* followAddHashtagSaga() {
  yield takeLatest(ADD_HASHTAG_SAGA, addHashtagSaga);
}

function* editHashtagSaga(dataContent) {
  const hashtag = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.editHashtag(hashtag)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllHashtagSaga());
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
export function* followEditHashtagSaga() {
  yield takeLatest(EDIT_HASHTAG_SAGA, editHashtagSaga);
}

function* deleteHashtagSaga(dataContent) {
  const hashtagId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.deleteHashtag(hashtagId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllHashtagSaga());
      openNotification(NOTIF_TYPE.SUCCESS, "A new hashtag is deleted", "");
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
export function* followDeleteHashtagSaga() {
  yield takeLatest(DELETE_HASHTAG_SAGA, deleteHashtagSaga);
}

function* findHashtagByIdSaga(dataContent) {
  const hashtagId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.getHashtagById(hashtagId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_HASHTAG_BY_ID,
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
export function* followFindHashtagByIdSaga() {
  yield takeLatest(FIND_HASHTAG_BY_ID_SAGA, findHashtagByIdSaga);
}

function* findHashtagByNameSaga(dataContent) {
  const hashtag = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.getHashtagByName(hashtag)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_HASHTAG_BY_NAME,
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
export function* followFindHashtagByNameSaga() {
  yield takeLatest(FIND_HASHTAG_BY_NAME_SAGA, findHashtagByNameSaga);
}

/**************************USERTYPE*****************************/
function* getAllUserTypeSaga() {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => GlobalService.getAllUsertype());

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_USERTYPE,
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
export function* followGetAllUserTypeSaga() {
  yield takeLatest(GET_ALL_USERTYPE_SAGA, getAllUserTypeSaga);
}

function* addUserTypeSaga(dataContent) {
  const userType = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.addUsertype(userType)
    );

    if (status === STATUS_CODE.CREATE) {
      yield call(() => getAllUserTypeSaga());
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
export function* followAddUserTypeSaga() {
  yield takeLatest(ADD_USERTYPE_SAGA, addUserTypeSaga);
}

function* editUserTypeSaga(dataContent) {
  const userType = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.editUsertype(userType)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllUserTypeSaga());
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
export function* followEditUserTypeSaga() {
  yield takeLatest(EDIT_USERTYPE_SAGA, editUserTypeSaga);
}

function* deleteUserTypeSaga(dataContent) {
  const userTypeId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.deleteUsertype(userTypeId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllUserTypeSaga());
      openNotification(NOTIF_TYPE.SUCCESS, "A new userType is deleted", "");
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
export function* followDeleteUserTypeSaga() {
  yield takeLatest(DELETE_USERTYPE_SAGA, deleteUserTypeSaga);
}

function* findUserTypeByIdSaga(dataContent) {
  const userTypeId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.getUsertypeById(userTypeId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_USERTYPE_BY_ID,
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
export function* followFindUserTypeByIdSaga() {
  yield takeLatest(FIND_USERTYPE_BY_ID_SAGA, findUserTypeByIdSaga);
}

/**************************STATUS*****************************/
function* getAllStatusSaga() {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => GlobalService.getAllStatus());

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_STATUS,
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
export function* followGetAllStatusSaga() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga);
}

function* addStatusSaga(dataContent) {
  const statusObj = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.addStatus(statusObj)
    );

    if (status === STATUS_CODE.CREATE) {
      yield call(() => getAllStatusSaga());
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
export function* followAddStatusSaga() {
  yield takeLatest(ADD_STATUS_SAGA, addStatusSaga);
}

function* editStatusSaga(dataContent) {
  const statusObj = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.editStatus(statusObj)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllStatusSaga());
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
export function* followEditStatusSaga() {
  yield takeLatest(EDIT_STATUS_SAGA, editStatusSaga);
}

function* deleteStatusSaga(dataContent) {
  const statusId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.deleteStatus(statusId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllStatusSaga());
      openNotification(NOTIF_TYPE.SUCCESS, "A new status is deleted", "");
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
export function* followDeleteStatusSaga() {
  yield takeLatest(DELETE_STATUS_SAGA, deleteStatusSaga);
}

function* findStatusByIdSaga(dataContent) {
  const statusId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.getStatusById(statusId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_STATUS_BY_ID,
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
export function* followFindStatusByIdSaga() {
  yield takeLatest(FIND_STATUS_BY_ID_SAGA, findStatusByIdSaga);
}

/**************************PROVINCE*****************************/
function* getAllProvinceSaga() {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => GlobalService.getAllProvince());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROVINCE,
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
export function* followGetAllProvinceSaga() {
  yield takeLatest(GET_ALL_PROVINCE_SAGA, getAllProvinceSaga);
}

function* addProvinceSaga(dataContent) {
  const province = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.addProvince(province)
    );

    if (status === STATUS_CODE.CREATE) {
      yield call(() => getAllProvinceSaga());
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
export function* followAddProvinceSaga() {
  yield takeLatest(ADD_PROVINCE_SAGA, addProvinceSaga);
}

function* editProvinceSaga(dataContent) {
  const province = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.editProvince(province)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllProvinceSaga());
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
export function* followEditProvinceSaga() {
  yield takeLatest(EDIT_PROVINCE_SAGA, editProvinceSaga);
}

function* deleteProvinceSaga(dataContent) {
  const provinceId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.deleteProvince(provinceId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllProvinceSaga());
      openNotification(NOTIF_TYPE.SUCCESS, "A new province is deleted", "");
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
export function* followDeleteProvinceSaga() {
  yield takeLatest(DELETE_PROVINCE_SAGA, deleteProvinceSaga);
}

function* findProvinceByIdSaga(dataContent) {
  const provinceId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.getProvinceById(provinceId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_PROVINCE_BY_ID,
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
export function* followFindProvinceByIdSaga() {
  yield takeLatest(FIND_PROVINCE_BY_ID_SAGA, findProvinceByIdSaga);
}

/**************************BusType*****************************/
function* getAllBusTypeSaga() {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => GlobalService.getAllBusType());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_BUSTYPE,
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
export function* followGetAllBusTypeSaga() {
  yield takeLatest(GET_ALL_BUSTYPE_SAGA, getAllBusTypeSaga);
}

function* addBusTypeSaga(dataContent) {
  const busType = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.addBusType(busType)
    );

    if (status === STATUS_CODE.CREATE) {
      yield call(() => getAllBusTypeSaga());
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
export function* followAddBusTypeSaga() {
  yield takeLatest(ADD_BUSTYPE_SAGA, addBusTypeSaga);
}

function* editBusTypeSaga(dataContent) {
  const busType = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.editBusType(busType)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllBusTypeSaga());
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
export function* followEditBusTypeSaga() {
  yield takeLatest(EDIT_BUSTYPE_SAGA, editBusTypeSaga);
}

function* deleteBusTypeSaga(dataContent) {
  const busTypeId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.deleteBusType(busTypeId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllBusTypeSaga());
      openNotification(NOTIF_TYPE.SUCCESS, "A new busType is deleted", "");
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
export function* followDeleteBusTypeSaga() {
  yield takeLatest(DELETE_BUSTYPE_SAGA, deleteBusTypeSaga);
}

function* findBusTypeByIdSaga(dataContent) {
  const busTypeId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.getBusTypeById(busTypeId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_BUSTYPE_BY_ID,
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
export function* followFindBusTypeByIdSaga() {
  yield takeLatest(FIND_BUSTYPE_BY_ID_SAGA, findBusTypeByIdSaga);
}

/**************************PaymentMethod*****************************/
function* getAllPaymentMethodSaga() {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.getAllPaymentMethod()
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PAYMENT_METHOD,
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
export function* followGetAllPaymentMethodSaga() {
  yield takeLatest(GET_ALL_PAYMENT_METHOD_SAGA, getAllPaymentMethodSaga);
}

function* addPaymentMethodSaga(dataContent) {
  const paymentMethod = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.addPaymentMethod(paymentMethod)
    );
    if (status === STATUS_CODE.CREATE) {
      yield call(() => getAllPaymentMethodSaga());
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
export function* followAddPaymentMethodSaga() {
  yield takeLatest(ADD_PAYMENT_METHOD_SAGA, addPaymentMethodSaga);
}

function* editPaymentMethodSaga(dataContent) {
  const paymentMethod = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.editPaymentMethod(paymentMethod)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllPaymentMethodSaga());
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
export function* followEditPaymentMethodSaga() {
  yield takeLatest(EDIT_PAYMENT_METHOD_SAGA, editPaymentMethodSaga);
}

function* deletePaymentMethodSaga(dataContent) {
  const paymentId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.deletePaymentMethod(paymentId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllPaymentMethodSaga());
      openNotification(
        NOTIF_TYPE.SUCCESS,
        "",
        "A new paymentMethod is deleted"
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
export function* followDeletePaymentMethodSaga() {
  yield takeLatest(DELETE_PAYMENT_METHOD_SAGA, deletePaymentMethodSaga);
}

function* findPaymentMethodByIdSaga(dataContent) {
  const paymentId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.getPaymentMethodById(paymentId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_PAYMENT_METHOD_BY_ID,
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
export function* followFindPaymentMethodByIdSaga() {
  yield takeLatest(FIND_PAYMENT_METHOD_BY_ID_SAGA, findPaymentMethodByIdSaga);
}
/********************ARTICLE*********************/

function* getAllArticleSaga() {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => GlobalService.getAllArticle());
    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllHashtagSaga());
      yield put({
        type: GET_ARTICLE,
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
export function* followGetAllArticleSaga() {
  yield takeLatest(GET_ARTICLE_SAGA, getAllArticleSaga);
}

function* addArticleSaga(dataContent) {
  const article = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.addArticle(article)
    );

    if (status === STATUS_CODE.CREATE) {
      yield call(() => getAllArticleSaga());
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
export function* followAddArticleSaga() {
  yield takeLatest(ADD_ARTICLE_SAGA, addArticleSaga);
}

function* editArticleSaga(dataContent) {
  const article = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.editArticle(article)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllArticleSaga());
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
export function* followEditArticleSaga() {
  yield takeLatest(EDIT_ARTICLE_SAGA, editArticleSaga);
}

function* deleteArticleSaga(dataContent) {
  const articleId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.deleteArticle(articleId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllArticleSaga());
      openNotification(NOTIF_TYPE.SUCCESS, "A new article is deleted", "");
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
export function* followDeleteArticleSaga() {
  yield takeLatest(DELETE_ARTICLE_SAGA, deleteArticleSaga);
}

function* findArticleByIdSaga(dataContent) {
  const articleId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.getArticleById(articleId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_ARTICLE_BY_ID,
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
export function* followFindArticleByIdSaga() {
  yield takeLatest(FIND_ARTICLE_BY_ID_SAGA, findArticleByIdSaga);
}
function* getArticleByHashTagAndTitleSaga(dataContent) {
  const { hashtag, title } = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.getHashtagByName(hashtag)
    );
    if (status === STATUS_CODE.SUCCESS) {
      const article = yield call(() =>
        GlobalService.getArticleByHashTagAndTitle(data.id, title)
      );
      if (article.status === STATUS_CODE.SUCCESS) {
        yield put({
          type: FIND_ARTICLE_BY_HASHTAG_AND_TITLE,
          payload: article.data,
        });
      } else {
        openNotification(
          NOTIF_TYPE.ERROR,
          article.data.message,
          article.data.content
        );
      }
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
export function* followGetArticleByHashTagAndTitleSaga() {
  yield takeLatest(
    FIND_ARTICLE_BY_HASHTAG_AND_TITLE_SAGA,
    getArticleByHashTagAndTitleSaga
  );
}

/**************************POINT*****************************/
function* getAllPointSaga() {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => GlobalService.getAllPoint());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_POINT,
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
export function* followGetAllPointSaga() {
  yield takeLatest(GET_ALL_POINT_SAGA, getAllPointSaga);
}

function* addPointSaga(dataContent) {
  const point = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.addPoint(point)
    );

    if (status === STATUS_CODE.CREATE) {
      yield call(() => getAllPointSaga());
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
export function* followAddPointSaga() {
  yield takeLatest(ADD_POINT_SAGA, addPointSaga);
}

function* editPointSaga(dataContent) {
  const point = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.editPoint(point)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllPointSaga());
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
export function* followEditPointSaga() {
  yield takeLatest(EDIT_POINT_SAGA, editPointSaga);
}

function* deletePointSaga(dataContent) {
  const pointId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.deletePoint(pointId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllPointSaga());
      openNotification(NOTIF_TYPE.SUCCESS, "A new point is deleted", "");
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
export function* followDeletePointSaga() {
  yield takeLatest(DELETE_POINT_SAGA, deletePointSaga);
}

function* findPointByIdSaga(dataContent) {
  const pointId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.getPointById(pointId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_POINT_BY_ID,
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
export function* followFindPointByIdSaga() {
  yield takeLatest(FIND_POINT_BY_ID_SAGA, findPointByIdSaga);
}

/**************************PAYMENT STATUS*****************************/
function* getAllPaymentStatusSaga() {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => GlobalService.getAllPaymentStatus());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PAYMENT_STATUS,
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
export function* followGetAllPaymentStatusSaga() {
  yield takeLatest(GET_ALL_PAYMENT_STATUS_SAGA, getAllPaymentStatusSaga);
}

function* addPaymentStatusSaga(dataContent) {
  const item = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.addPaymentStatus(item)
    );

    if (status === STATUS_CODE.CREATE) {
      yield call(() => getAllPaymentStatusSaga());
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
export function* followAddPaymentStatusSaga() {
  yield takeLatest(ADD_PAYMENT_STATUS_SAGA, addPaymentStatusSaga);
}

function* editPaymentStatusSaga(dataContent) {
  const item = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.editPaymentStatus(item)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllPaymentStatusSaga());
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
export function* followEditPaymentStatusSaga() {
  yield takeLatest(EDIT_PAYMENT_STATUS_SAGA, editPaymentStatusSaga);
}

function* deletePaymentStatusSaga(dataContent) {
  const id = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.deletePaymentStatus(id)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllPaymentStatusSaga());
      openNotification(NOTIF_TYPE.SUCCESS, "A new payment status is deleted", "");
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
export function* followDeletePaymentStatusSaga() {
  yield takeLatest(DELETE_PAYMENT_STATUS_SAGA, deletePaymentStatusSaga);
}

function* findPaymentStatusByIdSaga(dataContent) {
  const id = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.getPaymentStatusById(id)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_PAYMENT_STATUS_BY_ID,
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
export function* followFindPaymentStatusByIdSaga() {
  yield takeLatest(FIND_PAYMENT_STATUS_BY_ID_SAGA, findPaymentStatusByIdSaga);
}

/**************************ORDER STATUS*****************************/
function* getAllOrderStatusSaga() {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => GlobalService.getAllOrderStatus());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_ORDER_STATUS,
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
export function* followGetAllOrderStatusSaga() {
  yield takeLatest(GET_ALL_ORDER_STATUS_SAGA, getAllOrderStatusSaga);
}

function* addOrderStatusSaga(dataContent) {
  const item = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.addOrderStatus(item)
    );

    if (status === STATUS_CODE.CREATE) {
      yield call(() => getAllOrderStatusSaga());
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
export function* followAddOrderStatusSaga() {
  yield takeLatest(ADD_ORDER_STATUS_SAGA, addOrderStatusSaga);
}

function* editOrderStatusSaga(dataContent) {
  const item = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.editOrderStatus(item)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllOrderStatusSaga());
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
export function* followEditOrderStatusSaga() {
  yield takeLatest(EDIT_ORDER_STATUS_SAGA, editOrderStatusSaga);
}

function* deleteOrderStatusSaga(dataContent) {
  const id = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.deleteOrderStatus(id)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllOrderStatusSaga());
      openNotification(NOTIF_TYPE.SUCCESS, "A new order status is deleted", "");
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
export function* followDeleteOrderStatusSaga() {
  yield takeLatest(DELETE_ORDER_STATUS_SAGA, deleteOrderStatusSaga);
}

function* findOrderStatusByIdSaga(dataContent) {
  const id = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      GlobalService.getOrderStatusById(id)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_ORDER_STATUS_BY_ID,
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
export function* followFindOrderStatusByIdSaga() {
  yield takeLatest(FIND_ORDER_STATUS_BY_ID_SAGA, findOrderStatusByIdSaga);
}
