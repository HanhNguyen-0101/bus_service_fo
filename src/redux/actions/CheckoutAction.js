import {
  CLEAR_PAYMENT_CHECKOUT,
  SET_PAYMENT_CHECKOUT,
  SET_POINT_CURRENT,
  SET_SEAT_CURRENT,
  SET_SUBMIT_NEXT_CHECKOUT,
  SET_USER_CHECKOUT_CURRENT,
  SUBMIT_PAYMENT_CHECKOUT_SAGA,
} from "../contants/CheckoutConstant";

export const setSeatCurrent = (seatCurrent) => ({
  type: SET_SEAT_CURRENT,
  payload: seatCurrent,
});
export const setPointCurrent = (pointCurrent) => ({
  type: SET_POINT_CURRENT,
  payload: pointCurrent,
});
export const setSubmitNextCheckout = (submitNextCheckout) => ({
  type: SET_SUBMIT_NEXT_CHECKOUT,
  payload: { submitNextCheckout },
});
export const setUserCheckoutCurrent = (userCurrent) => ({
  type: SET_USER_CHECKOUT_CURRENT,
  payload: userCurrent,
});
export const setPaymentCheckout = (payment) => ({
  type: SET_PAYMENT_CHECKOUT,
  payload: payment,
});
export const submitPaymentCheckout = (data) => ({
  type: SUBMIT_PAYMENT_CHECKOUT_SAGA,
  payload: data,
});
export const clearPaymentCheckout = () => ({
  type: CLEAR_PAYMENT_CHECKOUT,
});
