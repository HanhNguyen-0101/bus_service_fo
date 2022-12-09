import {
  ADD_STATION_SAGA,
  DELETE_STATION_SAGA,
  EDIT_STATION_SAGA,
  FIND_STATION_BY_ID_SAGA,
  FIND_STATION_BY_KEYWORD_SAGA,
  GET_ALL_STATION_SAGA,
} from "../contants/StationConstant";

export const getAllStation = () => ({
  type: GET_ALL_STATION_SAGA,
});
export const addStation = (data) => ({
  type: ADD_STATION_SAGA,
  payload: data,
});
export const editStation = (data) => ({
  type: EDIT_STATION_SAGA,
  payload: data,
});
export const deleteStation = ({ id }) => ({
  type: DELETE_STATION_SAGA,
  payload: { id },
});
export const findStationById = ({ id }) => ({
  type: FIND_STATION_BY_ID_SAGA,
  payload: { id },
});
export const findStationByKeyword = (keyword) => ({
  type: FIND_STATION_BY_KEYWORD_SAGA,
  payload: { keyword },
});
