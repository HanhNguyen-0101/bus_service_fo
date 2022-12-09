import { baseService } from "./baseService";

class TicketManagementService extends baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  getAllTicket() {
    return this.get("tickets");
  }
  addTicket = (data) => {
    return this.post("tickets", data);
  };
  editTicket = (data) => {
    return this.put(`tickets/${data.id}`, data);
  };
  deleteTicket = ({ id }) => {
    return this.delete(`tickets/${id}`);
  };
  findTicketById = ({ id }) => {
    return this.get(`tickets/${id}`);
  };
  filterTickByEmail = ({ email }) => {
    return this.get(`tickets/email/${email}`);
  };
  findTicketByKeyword = ({ keyword }) => {
    return this.get(`tickets/keyword/${keyword}`);
  };
}

export const TicketService = new TicketManagementService();
