import { Seat } from "../../models/SeatModel";
import { mapSeatPointByTicket, Ticket } from "../../models/TicketModel";
import {
  FILTER_TICKET_BY_EMAIL,
  FIND_TICKET_BY_ID,
  FIND_TICKET_BY_KEYWORD,
  GET_ALL_TICKET,
} from "../contants/TicketConstant";

const initialState = {
  ticketList: [],
  ticketSelected: {},
  ticketOfUser: []
};

export const TicketReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_TICKET:
      const ticketList = mapSeatPointByTicket(
        payload?.ticket.map(i => new Ticket(i)),
        payload?.seats.map(i => new Seat(i)),
        payload?.points);
      return { ...state, ticketList };
    case FIND_TICKET_BY_ID: {
      return { ...state, ticketSelected: new Ticket(payload) };
    }
    case FIND_TICKET_BY_KEYWORD: {
      const ticketList = mapSeatPointByTicket(
        payload?.ticket.map(i => new Ticket(i)),
        payload?.seats.map(i => new Seat(i)),
        payload?.points);
      return { ...state, ticketList };
    }
    case FILTER_TICKET_BY_EMAIL: {
      const ticketOfUser = mapSeatPointByTicket(
        payload?.ticket.map(i => new Ticket(i)),
        payload?.seats.map(i => new Seat(i)),
        payload?.points);
      return { ...state, ticketOfUser };
    }
    default:
      return state;
  }
};
