import { Ticket } from "../../models/TicketModel";
import { BOOKING_TICKET } from "../../utils/configSetting";
import {
  CLEAR_PAYMENT_CHECKOUT,
  SET_PAYMENT_CHECKOUT,
  SET_POINT_CURRENT,
  SET_SEAT_CURRENT,
  SET_SUBMIT_NEXT_CHECKOUT,
  SET_USER_CHECKOUT_CURRENT,
  SUBMIT_PAYMENT_CHECKOUT,
} from "../contants/CheckoutConstant";

let bookingData = {};
if (localStorage.getItem(BOOKING_TICKET)) {
  bookingData = JSON.parse(localStorage.getItem(BOOKING_TICKET));
}

const initialState = {
  seatCurrent: [],
  pointCurrent: {},
  submitNextCheckout: () => {},
  bookingData,
  paymentData: {},
  paymentSuccess: {},
};

export const CheckoutReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SEAT_CURRENT: {
      return { ...state, seatCurrent: payload };
    }
    case SET_POINT_CURRENT: {
      return { ...state, pointCurrent: payload };
    }
    case SET_SUBMIT_NEXT_CHECKOUT: {
      return { ...state, submitNextCheckout: payload.submitNextCheckout };
    }
    case SET_USER_CHECKOUT_CURRENT: {
      const { vehicledId } = state.seatCurrent[0];
      const { trip, busCompany, dropoff, pickup } = state.pointCurrent;
      const seatBooking = {
        busCompany: { id: busCompany.id, name: busCompany.name },
        vehicle: {
          vehicledId,
          seatList: state.seatCurrent?.map((i) => ({ id: i.id, name: i.name })),
        },
      };
      const pointBooking = {
        trip: {
          id: trip.id,
          price: trip.price,
          tripAt: trip.tripAt,
        },
        dropoff: JSON.parse(dropoff),
        pickup: JSON.parse(pickup),
      };
      const bookingData = {
        ...state.bookingData,
        seatBooking,
        pointBooking,
        userBooking: payload,
      };
      localStorage.setItem(BOOKING_TICKET, JSON.stringify(bookingData));
      return { ...state, bookingData };
    }
    case SET_PAYMENT_CHECKOUT: {
      return { ...state, paymentData: { ...state.paymentData, ...payload } };
    }
    case SUBMIT_PAYMENT_CHECKOUT: {
      return { ...state, paymentSuccess: new Ticket(payload) };
    }
    case CLEAR_PAYMENT_CHECKOUT: {
      localStorage.removeItem(BOOKING_TICKET);
      return {
        ...state,
        seatCurrent: [],
        pointCurrent: {},
        submitNextCheckout: () => {},
        paymentData: {},
        bookingData: {},
      };
    }
    default:
      return state;
  }
};
