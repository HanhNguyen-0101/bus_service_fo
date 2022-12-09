import {
  ADD_TICKET_SAGA,
  DELETE_TICKET_SAGA,
  EDIT_TICKET_SAGA,
  FILTER_TICKET_BY_EMAIL_SAGA,
  FIND_TICKET_BY_ID_SAGA,
  FIND_TICKET_BY_KEYWORD_SAGA,
  GET_ALL_TICKET_SAGA,
} from "../contants/TicketConstant";

export const getAllTicket = () => ({
  type: GET_ALL_TICKET_SAGA,
});
export const addTicket = (data) => ({
  type: ADD_TICKET_SAGA,
  payload: data,
});
export const editTicket = (data) => ({
  type: EDIT_TICKET_SAGA,
  payload: data,
});
export const deleteTicket = ({ id }) => ({
  type: DELETE_TICKET_SAGA,
  payload: { id },
});
export const findTicketById = ({ id }) => ({
  type: FIND_TICKET_BY_ID_SAGA,
  payload: { id },
});
export const findTicketByKeyword = (keyword) => ({
  type: FIND_TICKET_BY_KEYWORD_SAGA,
  payload: { keyword },
});
export const filterTickByEmail = (email) => ({
  type: FILTER_TICKET_BY_EMAIL_SAGA,
  payload: { email },
});