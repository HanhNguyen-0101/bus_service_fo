import { LOCATION_SEARCH } from "../../utils/configSetting";
import {
  CLEAR_CONTENT_LOCATION,
  SET_CONTENT_LOCATION,
} from "../contants/SearchConstant";

let location = {};
if (localStorage.getItem(LOCATION_SEARCH)) {
  location = JSON.parse(localStorage.getItem(LOCATION_SEARCH));
}

const initialState = {
  locationSelected: location,
};

export const SearchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CONTENT_LOCATION: {
      localStorage.setItem(LOCATION_SEARCH, JSON.stringify(payload));
      return { ...state, locationSelected: payload };
    }
    case CLEAR_CONTENT_LOCATION: {
      localStorage.removeItem(LOCATION_SEARCH);
      return { ...state, locationSelected: {} };
    }
    default:
      return state;
  }
};
