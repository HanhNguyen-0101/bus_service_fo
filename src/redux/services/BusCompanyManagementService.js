/* eslint-disable eqeqeq */
import { baseService } from "./baseService";

class BusCompanyManagementService extends baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  getAllBusCompany() {
    return this.get("passengerCarCompanies");
  }
  addBusCompany = (data) => {
    return this.postFormData("passengerCarCompanies", data);
  };
  editBusCompany = (data) => {
    const id = data.get("id");
    return this.putFormData(`passengerCarCompanies/${id}`, data);
  };
  deleteBusCompany = ({ id }) => {
    return this.delete(`passengerCarCompanies/${id}`);
  };
  findBusCompanyById = ({ id }) => {
    return this.get(`passengerCarCompanies/${id}`);
  };
  findBusCompanyByKeyword = ({ keyword }) => {
    return this.get(`passengerCarCompanies/keyword/${keyword}`)
  };
}

export const BusCompanyService = new BusCompanyManagementService();
