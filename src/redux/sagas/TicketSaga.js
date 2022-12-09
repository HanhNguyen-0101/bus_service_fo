import { call, put, takeLatest } from "redux-saga/effects";
import { STATUS_CODE } from "../../utils/configSetting";
import { NOTIF_TYPE, openNotification } from "../../utils/notification";
import { CLEAR_PAYMENT_CHECKOUT, SUBMIT_PAYMENT_CHECKOUT, SUBMIT_PAYMENT_CHECKOUT_SAGA } from "../contants/CheckoutConstant";
import { HIDE_DRAWER } from "../contants/DrawerConstant";
import { HIDE_LOADING, SHOW_LOADING } from "../contants/LoadingConstant";
import { ADD_TICKET_SAGA, DELETE_TICKET_SAGA, EDIT_TICKET_SAGA, FILTER_TICKET_BY_EMAIL, FILTER_TICKET_BY_EMAIL_SAGA, FIND_TICKET_BY_ID, FIND_TICKET_BY_ID_SAGA, FIND_TICKET_BY_KEYWORD, FIND_TICKET_BY_KEYWORD_SAGA, GET_ALL_TICKET, GET_ALL_TICKET_SAGA } from "../contants/TicketConstant";
import { GlobalService } from "../services/GlobalManagementService";
import { SeatService } from "../services/SeatManagementService";
import { TicketService } from "../services/TicketManagementService";

function* getAllTicketSaga() {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => TicketService.getAllTicket());
    const seats = yield call(() => SeatService.getAllSeat());
    const points = yield call(() => GlobalService.getAllPoint());

    if (status === STATUS_CODE.SUCCESS && seats.status === STATUS_CODE.SUCCESS && points.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_TICKET,
        payload: {ticket: data, seats: seats.data, points: points.data},
      });
    } else {
      data.message && openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
      seats.data.message && openNotification(NOTIF_TYPE.ERROR, seats.data.message, seats.data.content);
      points.data.message && openNotification(NOTIF_TYPE.ERROR, points.data.message, points.data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* followGetAllTicketSaga() {
  yield takeLatest(GET_ALL_TICKET_SAGA, getAllTicketSaga);
}

function* addTicketSaga(dataContent) {
  const ticket = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => TicketService.addTicket(ticket));

    if (status === STATUS_CODE.CREATE) {
      yield call(() => getAllTicketSaga());
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
export function* followAddTicketSaga() {
  yield takeLatest(ADD_TICKET_SAGA, addTicketSaga);
}

function* editTicketSaga(dataContent) {
  const ticket = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => TicketService.editTicket(ticket));

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllTicketSaga());
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
export function* followEditTicketSaga() {
  yield takeLatest(EDIT_TICKET_SAGA, editTicketSaga);
}

function* deleteTicketSaga(dataContent) {
  const ticketId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => TicketService.deleteTicket(ticketId));

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllTicketSaga());
      openNotification(NOTIF_TYPE.SUCCESS, "A new ticket is deleted", "");
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
export function* followDeleteTicketSaga() {
  yield takeLatest(DELETE_TICKET_SAGA, deleteTicketSaga);
}

function* findTicketByIdSaga(dataContent) {
  const ticketId = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => TicketService.findTicketById(ticketId));

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_TICKET_BY_ID,
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
export function* followFindTicketByIdSaga() {
  yield takeLatest(FIND_TICKET_BY_ID_SAGA, findTicketByIdSaga);
}

function* findTicketByKeywordSaga(dataContent) {
  const keyword = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      TicketService.findTicketByKeyword(keyword)
    );
    const seats = yield call(() => SeatService.getAllSeat());
    const points = yield call(() => GlobalService.getAllPoint());

    if (status === STATUS_CODE.SUCCESS && seats.status === STATUS_CODE.SUCCESS && points.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FIND_TICKET_BY_KEYWORD,
        payload: {ticket: data, seats: seats.data, points: points.data},
      });
    } else {
      data.message && openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
      seats.data.message && openNotification(NOTIF_TYPE.ERROR, seats.data.message, seats.data.content);
      points.data.message && openNotification(NOTIF_TYPE.ERROR, points.data.message, points.data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* followFindTicketByKeywordSaga() {
  yield takeLatest(FIND_TICKET_BY_KEYWORD_SAGA, findTicketByKeywordSaga);
}

function* filterTickByEmailSaga(dataContent) {
  const email = dataContent.payload;
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      TicketService.filterTickByEmail(email)
    );
    const seats = yield call(() => SeatService.getAllSeat());
    const points = yield call(() => GlobalService.getAllPoint());

    if (status === STATUS_CODE.SUCCESS && seats.status === STATUS_CODE.SUCCESS && points.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FILTER_TICKET_BY_EMAIL,
        payload: {ticket: data, seats: seats.data, points: points.data},
      });
    } else {
      data.message && openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
      seats.data.message && openNotification(NOTIF_TYPE.ERROR, seats.data.message, seats.data.content);
      points.data.message && openNotification(NOTIF_TYPE.ERROR, points.data.message, points.data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* followFilterTickByEmailSaga() {
  yield takeLatest(FILTER_TICKET_BY_EMAIL_SAGA, filterTickByEmailSaga);
}

function* submitCheckoutSaga(dataContent) {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      TicketService.addTicket(dataContent.payload)
    );
    if (status === STATUS_CODE.CREATE) {
      yield put({
        type: SUBMIT_PAYMENT_CHECKOUT,
        payload: data,
      });
      yield put({
        type: CLEAR_PAYMENT_CHECKOUT,
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
export function* followSubmitCheckoutSaga() {
  yield takeLatest(SUBMIT_PAYMENT_CHECKOUT_SAGA, submitCheckoutSaga);
}
