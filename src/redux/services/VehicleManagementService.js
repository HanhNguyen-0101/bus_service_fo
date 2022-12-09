/* eslint-disable eqeqeq */
import moment from "moment";
import { baseService } from "./baseService";
class VehicleManagementService extends baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  getAllVehicle() {
    return this.get("vehicles");
  }
  addVehicle = (data) => {
    return this.postFormData("vehicles", data);
  };
  editVehicle = (data) => {
    const id = data.get("id");
    return this.putFormData(`vehicles/${id}`, data);
  };
  deleteVehicle = ({ id }) => {
    return this.delete(`vehicles/${id}`);
  };
  findVehicleById = ({ id }) => {
    return this.get(`vehicles/${id}`);
  };
  findVehicleByKeyword = ({ keyword }) => {
    return this.get(`vehicles/keyword/${keyword}`)
  };
  findVehicleFollowTripDate = (fromId, toId, date) => {
    let url = `vehicles/search/${fromId}/${toId}`;
    if (date) {
      url += `/${moment(date).format('YYYY-MM-DD')}`;
    }
    return this.get(url);
  }
}

export const VehicleService = new VehicleManagementService();
