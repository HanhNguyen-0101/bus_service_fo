import { baseService } from "./baseService";

class StationManagementService extends baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  getAllStation() {
    return this.get("stations");
  }
  addStation = (data) => {
    return this.postFormData("stations", data);
  };
  editStation = (data) => {
    const id = data.get("id");
    return this.putFormData(`stations/${id}`, data);
  };
  deleteStation = ({ id }) => {
    return this.delete(`stations/${id}`);
  };
  findStationById = ({ id }) => {
    return this.get(`stations/${id}`);
  };
  findStationByKeyword = ({ keyword }) => {
    return this.get(`stations/keyword/${keyword}`)
  };
}
export const StationService = new StationManagementService();
