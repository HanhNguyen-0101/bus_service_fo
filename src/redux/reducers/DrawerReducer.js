import {
  HIDE_DRAWER,
  RESET_CALLBACK_DRAWER,
  SET_CALLBACK_DRAWER,
  SET_CONTENT_DRAWER,
  SHOW_DRAWER,
} from "../contants/DrawerConstant";

const initialState = {
  visible: false,
  FormComponent: <></>,
  title: "",
  submitAction: () => {},
  resetAction: () => {},
};

export const DrawerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_DRAWER:
      return { ...state, visible: true };
    case HIDE_DRAWER:
      return { ...state, visible: false };
    case SET_CALLBACK_DRAWER:
      return { ...state, submitAction: payload.submitAction };
    case RESET_CALLBACK_DRAWER:
      return { ...state, resetAction: payload.resetAction };
    case SET_CONTENT_DRAWER:
      return {
        ...state,
        title: payload.title,
        FormComponent: payload.FormComponent,
      };
    default:
      return state;
  }
};
