import { Trip } from "../../models/TripModel";
import {
  FIND_TRIP_BY_ID,
  FIND_TRIP_BY_KEYWORD,
  GET_TRIP,
} from "../contants/TripConstant";

const initialState = {
  tripList: [],
  tripSelected: {},
};

export const TripReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TRIP:
      return { ...state, tripList: payload?.map(i => new Trip(i)) };
    case FIND_TRIP_BY_ID: {
      return { ...state, tripSelected: new Trip(payload) };
    }
    case FIND_TRIP_BY_KEYWORD: {
      return { ...state, tripList: payload?.map(i => new Trip(i)) };
    }
    default:
      return state;
  }
};
