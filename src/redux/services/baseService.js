import axios from "axios";
import { DOMAIN, STATUS_CODE, TOKEN } from "../../utils/configSetting.js";

export class baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  get(url) {
    return axios.get(`${DOMAIN}${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });
  }
  getBase(url) {
    return axios.get(`${DOMAIN}${url}`);
  }
  postFormData(url, data) {
    return axios.post(`${DOMAIN}${url}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
        "Content-Type": "multipart/form-data"
      },
    });
  }
  post(url, data) {
    return axios.post(`${DOMAIN}${url}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });
  }
  postBase(url, data) {
    return axios.post(`${DOMAIN}${url}`, data);
  }
  putFormData(url, data) {
    return axios.put(`${DOMAIN}${url}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
        "Content-Type": "multipart/form-data"
      },
    });
  }
  put(url, data) {
    return axios.put(`${DOMAIN}${url}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });
  }
  delete(url) {
    return axios.delete(`${DOMAIN}${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });
  }

  getAll(url) {
    const data = require(`./../../data/${url}.json`);
    return { data, status: STATUS_CODE.SUCCESS };
  }
}