import { baseService } from "./baseService";

class TripManagementService extends baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  getAllTrip() {
    return this.get('trips');
  }
  addTrip = (data) => {
    return this.postFormData("trips", data);

  };
  editTrip = (data) => {
    const id = data.get("id");
    return this.putFormData(`trips/${id}`, data);
  };
  deleteTrip = ({ id }) => {
    return this.delete(`trips/${id}`);
  };
  findTripById = ({ id }) => {
    return this.get(`trips/${id}`);
  };
  findTripByKeyword = ({ keyword }) => {
    return this.get(`trips/keyword/${keyword}`);
  };
}

export const TripService = new TripManagementService();
