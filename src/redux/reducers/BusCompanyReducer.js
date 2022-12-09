import { BusCompany } from "../../models/BusCompanyModel";
import {
  FIND_BUS_COMPANY_BY_ID,
  FIND_BUS_COMPANY_BY_KEYWORD,
  GET_BUS_COMPANY,
} from "../contants/BusCompanyConstant";

const initialState = {
  busCompanies: [],
  busCompanySelected: {},
};

export const BusCompanyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_BUS_COMPANY:
      return { ...state, busCompanies: payload?.map(i => new BusCompany(i)) };
    case FIND_BUS_COMPANY_BY_ID: {
      return { ...state, busCompanySelected: new BusCompany(payload) };
    }
    case FIND_BUS_COMPANY_BY_KEYWORD: {
      return { ...state, busCompanies: payload?.map(i => new BusCompany(i)) };
    }
    default:
      return state;
  }
};
