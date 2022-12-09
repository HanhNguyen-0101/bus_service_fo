import { baseService } from "./baseService";
class SeatManagementService extends baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  getAllSeat() {
    return this.get("seats");
  }
  addSeat = (data) => {
    return this.post("seats", data);
  };
  editSeat = (data) => {
    return this.put(`seats/${data.id}`, data);
  };
  deleteSeat = ({ id }) => {
    return this.delete(`seats/${id}`);
  };
  findSeatById = ({ id }) => {
    return this.get(`seats/${id}`);
  };
  findSeatByKeyword = ({ keyword }) => {
    return this.get(`seats/keyword/${keyword}`);
  };
}

export const SeatService = new SeatManagementService();
