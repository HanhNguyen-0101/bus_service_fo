import { OrderStatus, PaymentMethod, PaymentStatus } from "./GlobalModel";
import { Vehicle } from "./VehicleModel";

export class Ticket {
  constructor({
    id,
    point,
    identify,
    name,
    email,
    numberPhone,
    vehicledId,
    seatSelected,
    orderStatusId,
    paymentMethodId,
    note,
    paymentStatusId,
    createdAt,
    updatedAt,
    paymentMethodTicket,
    orderStatusTicket,
    paymentStatusTicket,
    vehicledTicket,
  }) {
    this.id = id || null;
    this.identify = identify || null;
    this.name = name || null;
    this.email = email || null;
    this.numberPhone = numberPhone || null;
    this.vehicledId = vehicledId || null;
    this.orderStatusId = orderStatusId || null;
    this.paymentMethodId = paymentMethodId || null;
    this.note = note || null;
    this.paymentStatusId = paymentStatusId || null;
    this.createdAt = createdAt || null;
    this.updatedAt = updatedAt || null;
    this.point = point ? JSON.parse(point) : null;
    this.seatSelected = seatSelected ? JSON.parse(seatSelected) : null;
    this.paymentMethodObj = paymentMethodTicket
      ? new PaymentMethod(paymentMethodTicket)
      : null;
    this.orderStatusObj = orderStatusTicket
      ? new OrderStatus(orderStatusTicket)
      : null;
    this.paymentStatusObj = paymentStatusTicket
      ? new PaymentStatus(paymentStatusTicket)
      : null;
    this.vehicledObj = vehicledTicket ? new Vehicle(vehicledTicket) : null;
  }
}
export const mapSeatPointByTicket = (ticketList, seatList, pointList = []) => {
  const result = ticketList?.map((ticket) => {
    const seatSelectedObj = ticket.seatSelected?.map(i => {
      return seatList.find(j => j.id === i)
    });
    if (pointList && pointList.length) {
      const pickup = pointList?.find(h2 => h2.id === ticket.point.pickup);
      const dropoff = pointList?.find(h2 => h2.id === ticket.point.dropoff);
      ticket.pointObj = {
        pickup,
        dropoff
      }
    }
    return {
      ...ticket,
      seatSelectedObj,
    };
  });
  return result;
};
