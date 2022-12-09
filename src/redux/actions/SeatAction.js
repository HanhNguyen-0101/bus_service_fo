import {
  ADD_SEAT_SAGA,
  DELETE_SEAT_SAGA,
  EDIT_SEAT_SAGA,
  FIND_SEAT_BY_ID_SAGA,
  FIND_SEAT_BY_KEYWORD_SAGA,
  GET_ALL_SEAT_SAGA,
} from "../contants/SeatConstant";

export const getAllSeat = () => ({
  type: GET_ALL_SEAT_SAGA,
});
export const addSeat = (data) => ({
  type: ADD_SEAT_SAGA,
  payload: data,
});
export const editSeat = (data) => ({
  type: EDIT_SEAT_SAGA,
  payload: data,
});
export const deleteSeat = ({ id }) => ({
  type: DELETE_SEAT_SAGA,
  payload: { id },
});
export const findSeatById = ({ id }) => ({
  type: FIND_SEAT_BY_ID_SAGA,
  payload: { id },
});
export const findSeatByKeyword = (keyword) => ({
  type: FIND_SEAT_BY_KEYWORD_SAGA,
  payload: { keyword },
});