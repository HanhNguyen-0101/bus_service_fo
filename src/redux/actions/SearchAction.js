import {
  CLEAR_CONTENT_LOCATION,
  SET_CONTENT_LOCATION,
} from "../contants/SearchConstant";

export const setLocation = (location) => ({
  type: SET_CONTENT_LOCATION,
  payload: location,
});

export const clearLocation = () => ({
  type: CLEAR_CONTENT_LOCATION,
});
