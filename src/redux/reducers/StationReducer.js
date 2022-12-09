import { Station } from "../../models/StationModel";
import {
  FIND_STATION_BY_ID,
  FIND_STATION_BY_KEYWORD,
  GET_ALL_STATION,
} from "../contants/StationConstant";

const initialState = {
  stationList: [],
  stationSelected: {},
};

export const StationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_STATION:
      return { ...state, stationList: payload?.map((i) => new Station(i)) };
    case FIND_STATION_BY_ID: {
      return { ...state, stationSelected: new Station(payload) };
    }
    case FIND_STATION_BY_KEYWORD: {
      return { ...state, stationList: payload?.map((i) => new Station(i)) };
    }
    default:
      return state;
  }
};
