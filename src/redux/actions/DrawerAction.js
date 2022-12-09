import {
  HIDE_DRAWER,
  RESET_CALLBACK_DRAWER,
  SET_CALLBACK_DRAWER,
  SET_CONTENT_DRAWER,
  SHOW_DRAWER,
} from "../contants/DrawerConstant";

export const showDrawer = () => ({
  type: SHOW_DRAWER,
});

export const hideDrawer = () => ({
  type: HIDE_DRAWER,
});

export const setContentDrawer = (title, FormComponent) => ({
  type: SET_CONTENT_DRAWER,
  payload: { title, FormComponent },
});

export const setCallbackDrawer = (submitAction) => ({
  type: SET_CALLBACK_DRAWER,
  payload: { submitAction },
});

export const setResetCallbackDrawer = (resetAction) => ({
  type: RESET_CALLBACK_DRAWER,
  payload: { resetAction },
});
