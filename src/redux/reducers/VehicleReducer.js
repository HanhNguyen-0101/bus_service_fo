import _ from "lodash";
import { Seat } from "../../models/SeatModel";
import { mapVehiclePointSeat, Vehicle } from "../../models/VehicleModel";
import {
  FIND_VEHICLE_BY_ID,
  FIND_VEHICLE_BY_KEYWORD,
  FIND_VEHICLE_BY_TRIP_BUS,
  GET_ALL_VEHICLE,
  SORT_BUS_TRIP,
} from "../contants/VehicleConstant";

const initialState = {
  vehicleList: [],
  vehicleSelected: {},
  tripBusList: [],
};

export const VehicleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_VEHICLE:
      const vehicleList = payload?.vehicle.map(i => new Vehicle(i));
      const vehiclePointSeat = mapVehiclePointSeat(vehicleList, payload?.point, payload?.seats.map(i => new Seat(i)));
      return { ...state, vehicleList: vehiclePointSeat};
    case FIND_VEHICLE_BY_ID: {
      return { ...state, vehicleSelected: new Vehicle(payload) };
    }
    case FIND_VEHICLE_BY_KEYWORD: {
      return { ...state, vehicleList: payload?.map(i => new Vehicle(i)) };
    }
    case FIND_VEHICLE_BY_TRIP_BUS: {
      const vehicleList = payload?.vehicle.map(i => new Vehicle(i));
      const vehiclePointSeat = mapVehiclePointSeat(vehicleList, payload?.point, payload?.seats.map(i => new Seat(i)));
      return { ...state, tripBusList: vehiclePointSeat};
    }
    case SORT_BUS_TRIP: {
      const { sortBy, sortType } = payload;
      switch (sortBy) {
        case "price":
          return {
            ...state,
            tripBusList: _.orderBy(
              state.tripBusList,
              (item) => item.tripObj[sortBy],
              [sortType]
            ),
          };

        case "tripAt":
          return {
            ...state,
            tripBusList: _.orderBy(
              state.tripBusList,
              (item) => item.tripObj[sortBy],
              [sortType]
            ),
          };
        default:
          return { ...state };
      }
    }
    default:
      return state;
  }
};
