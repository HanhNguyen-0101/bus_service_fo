import {
  ADD_BUS_COMPANY_SAGA,
  DELETE_BUS_COMPANY_SAGA,
  EDIT_BUS_COMPANY_SAGA,
  FIND_BUS_COMPANY_BY_ID_SAGA,
  FIND_BUS_COMPANY_BY_KEYWORD_SAGA,
  GET_BUS_COMPANY_SAGA,
} from "../contants/BusCompanyConstant";

export const getAllBusCompany = () => ({
  type: GET_BUS_COMPANY_SAGA,
});
export const addBusCompany = (data) => ({
  type: ADD_BUS_COMPANY_SAGA,
  payload: data,
});
export const editBusCompany = (data) => ({
  type: EDIT_BUS_COMPANY_SAGA,
  payload: data,
});
export const deleteBusCompany = ({ id }) => ({
  type: DELETE_BUS_COMPANY_SAGA,
  payload: { id },
});
export const findBusCompanyById = ({ id }) => ({
  type: FIND_BUS_COMPANY_BY_ID_SAGA,
  payload: { id },
});
export const findBusCompanyByKeyword = (keyword) => ({
  type: FIND_BUS_COMPANY_BY_KEYWORD_SAGA,
  payload: { keyword },
});
