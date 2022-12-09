import { Seat } from "../../models/SeatModel";
import {
  FIND_SEAT_BY_ID,
  FIND_SEAT_BY_KEYWORD,
  GET_ALL_SEAT,
} from "../contants/SeatConstant";

const initialState = {
  seatList: [],
  seatSelected: {},
};

export const SeatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_SEAT:
      return { ...state, seatList: payload?.map(i => new Seat(i)) };
    case FIND_SEAT_BY_ID: {
      return { ...state, seatSelected: new Seat(payload) };
    }
    case FIND_SEAT_BY_KEYWORD: {
      return { ...state, seatList: payload?.map(i => new Seat(i)) };
    }
    default:
      return state;
  }
};
