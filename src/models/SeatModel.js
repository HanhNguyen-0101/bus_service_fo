import { Status } from "./GlobalModel";
import { Vehicle } from "./VehicleModel";

export class Seat {
  constructor({ id, name, vehicledId, seatStatusId, seatVehicle, seatStatus }) {
    this.id = id ? id : null;
    this.name = name ? name : null;
    this.vehicledId = vehicledId ? vehicledId : null;
    this.seatStatusId = seatStatusId ? seatStatusId : null;
    this.vehicledObj = seatVehicle ? new Vehicle(seatVehicle) : null;
    this.seatStatusObj = seatStatus ? new Status(seatStatus) : null;
  }
}

export const groupSeatByVehicle = (seatList) => {
  return seatList?.reduce(
    (
      seat,
      { id, name, seatStatusId, seatStatusObj, vehicledId, vehicledObj }
    ) => {
      if (!seat[vehicledId]) seat[vehicledId] = [];
      seat[vehicledId].push({
        id,
        name,
        seatStatusId,
        seatStatusObj,
        vehicledId,
        vehicledObj,
      });
      return seat;
    },
    {}
  );
};
