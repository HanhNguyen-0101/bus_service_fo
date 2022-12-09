import { BusCompany } from "./BusCompanyModel";
import { BusType } from "./GlobalModel";
import { Trip } from "./TripModel";

export class Vehicle {
  constructor({
    id,
    name,
    image,
    numberFloor,
    numberSeat,
    point,
    promo,
    busTypeId,
    vehicleBusType,
    passengerCarCompaniesId,
    vehiclePassengerCarCompanies,
    tripId,
    vehicleTrip,
  }) {
    this.id = id || null;
    this.name = name || null;
    this.image = image || null;
    this.numberFloor = numberFloor || 0;
    this.numberSeat = numberSeat || 0;
    this.point = point ? new Point(JSON.parse(point)) : null;
    this.promo = promo ? new Promo(JSON.parse(promo)) : null;
    this.passengerCarCompaniesId = passengerCarCompaniesId || null;
    this.busCompanyObj = vehiclePassengerCarCompanies
      ? new BusCompany(vehiclePassengerCarCompanies)
      : null;
    this.tripId = tripId || null;
    this.tripObj = vehicleTrip ? new Trip(vehicleTrip) : null;
    this.busTypeId = busTypeId || null;
    this.busTypeObj = vehicleBusType ? new BusType(vehicleBusType) : null;
  }
}

export class Promo {
  constructor(promo = {}) {
    this["percent"] = promo["percent"] || 0;
    this["max"] = promo["max"] || 0;
  }
}

export class Point {
  constructor(point = {}) {
    this["pickup"] = point["pickup"] || [];
    this["dropoff"] = point["dropoff"] || [];
  }
}

export const mapVehiclePointSeat = (
  vehicleList = [],
  pointList = [],
  seatList = []
) => {
  const result = vehicleList?.map((vehicle) => {
    const pickupObj = vehicle.point.pickup?.map((h1) => {
      return pointList?.find((h2) => h2.id === h1);
    });
    const dropoffObj = vehicle.point.dropoff?.map((h1) => {
      return pointList?.find((h2) => h2.id === h1);
    });
    if (seatList && seatList.length) {
      const seats = seatList?.filter((h1) => h1.vehicledId === vehicle.id);
      vehicle.seats = seats;
    }
    return {
      ...vehicle,
      point: {
        ...vehicle.point,
        pickupObj,
        dropoffObj,
      },
    };
  });
  return result;
};
