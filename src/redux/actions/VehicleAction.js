import {
  ADD_VEHICLE_SAGA,
  DELETE_VEHICLE_SAGA,
  EDIT_VEHICLE_SAGA,
  FIND_VEHICLE_BY_ID_SAGA,
  FIND_VEHICLE_BY_KEYWORD_SAGA,
  FIND_VEHICLE_BY_TRIP_BUS_SAGA,
  GET_ALL_VEHICLE_SAGA,
  SORT_BUS_TRIP,
} from "../contants/VehicleConstant";

export const getAllVehicle = () => ({
  type: GET_ALL_VEHICLE_SAGA,
});
export const addVehicle = (data) => ({
  type: ADD_VEHICLE_SAGA,
  payload: data,
});
export const editVehicle = (data) => ({
  type: EDIT_VEHICLE_SAGA,
  payload: data,
});
export const deleteVehicle = ({ id }) => ({
  type: DELETE_VEHICLE_SAGA,
  payload: { id },
});
export const findVehicleById = ({ id }) => ({
  type: FIND_VEHICLE_BY_ID_SAGA,
  payload: { id },
});
export const findVehicleByKeyword = (keyword) => ({
  type: FIND_VEHICLE_BY_KEYWORD_SAGA,
  payload: { keyword },
});
export const findVehicleFollowTripDate = (fromId, toId, date) => ({
  type: FIND_VEHICLE_BY_TRIP_BUS_SAGA,
  payload: { fromId, toId, date },
});
export const sortTripBus = (sortBy, sortType) => ({
  type: SORT_BUS_TRIP,
  payload: { sortBy, sortType },
});
