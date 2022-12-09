import { baseService } from "./baseService";

class UserManagementService extends baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  login(data) {
    return this.postBase("users/login", data);
  }
  register(data) {
    return this.postBase("users/register", data);
  }
  getAllUser = () => {
    return this.get("users");
  };
  addUser = (data) => {
    return this.postFormData("users", data);
  };
  editUser = (data) => {
    const id = data.get("id");
    return this.putFormData(`users/${id}`, data);
  };
  deleteUser = ({ id }) => {
    return this.delete(`users/${id}`);
  };
  getUserById = ({ id }) => {
    return this.get(`users/${id}`);
  };
  getUserByKeyword = ({ keyword }) => {
    return this.get(`users/keyword/${keyword}`)
  };
}

export const UserService = new UserManagementService();
