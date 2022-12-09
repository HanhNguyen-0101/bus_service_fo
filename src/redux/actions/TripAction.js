import { ADD_TRIP_SAGA, DELETE_TRIP_SAGA, EDIT_TRIP_SAGA, FIND_TRIP_BY_ID_SAGA, FIND_TRIP_BY_KEYWORD_SAGA, GET_TRIP_SAGA } from "../contants/TripConstant";

export const getTrip = () => ({
    type: GET_TRIP_SAGA
});
export const addTrip = (data) => ({
    type: ADD_TRIP_SAGA,
    payload: data,
  });
  export const editTrip = (data) => ({
    type: EDIT_TRIP_SAGA,
    payload: data,
  });
  export const deleteTrip = ({ id }) => ({
    type: DELETE_TRIP_SAGA,
    payload: { id },
  });
  export const findTripById = ({ id }) => ({
    type: FIND_TRIP_BY_ID_SAGA,
    payload: { id },
  });
  export const findTripByKeyword = (keyword) => ({
    type: FIND_TRIP_BY_KEYWORD_SAGA,
    payload: { keyword },
  });
  