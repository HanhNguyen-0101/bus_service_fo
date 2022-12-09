/* eslint-disable eqeqeq */
import { baseService } from "./baseService";

class GlobalManagementService extends baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  getAllArticle() {
    return this.getAll("global/article");
  }
  getArticleById({ id }) {
    return this.getBase(`global/article/${id}`);
  }
  addArticle(data) {
    return this.postFormData("global/article", data);
  }
  editArticle(data) {
    const id = data.get("id");
    return this.putFormData(`global/article/${id}`, data);
  }
  deleteArticle({ id }) {
    return this.delete(`global/article/${id}`);
  }
  getArticleByHashTagAndTitle(hashtag, title) {
    return this.get(`global/article/find/${hashtag}/${title}`);
  }

  /******************Banner - DONE******************/
  getAllBanner() {
    return this.getAll("global/banner");
  }
  getBannerById({ id }) {
    return this.getBase(`global/banner/${id}`);
  }
  addBanner(data) {
    return this.postFormData("global/banner", data);
  }
  editBanner(data) {
    const id = data.get("id");
    return this.putFormData(`global/banner/${id}`, data);
  }
  deleteBanner({ id }) {
    return this.delete(`global/banner/${id}`);
  }

  /******************Payment Method - DONE******************/
  getAllPaymentMethod() {
    return this.getAll("global/payment-method");
  }
  getPaymentMethodById({ id }) {
    return this.getBase(`global/payment-method/${id}`);
  }
  addPaymentMethod(data) {
    return this.postFormData("global/payment-method", data);
  }
  editPaymentMethod(data) {
    const id = data.get("id");
    return this.putFormData(`global/payment-method/${id}`, data);
  }
  deletePaymentMethod({ id }) {
    return this.delete(`global/payment-method/${id}`);
  }

  /******************HASHTAG - DONE******************/
  getAllHashtag() {
    return this.getAll("global/hashtag");
  }
  getHashtagById({ id }) {
    return this.getBase(`global/hashtag/${id}`);
  }
  addHashtag(data) {
    return this.post("global/hashtag", data);
  }
  editHashtag(data) {
    return this.put(`global/hashtag/${data.id}`, data);
  }
  deleteHashtag({ id }) {
    return this.delete(`global/hashtag/${id}`);
  }
  getHashtagByName(name) {
    return this.get(`global/hashtag/name/${name}`);
  }
  /********************PROVINCE - DONE****************/
  getAllProvince() {
    return this.getAll("global/province");
  }
  getProvinceById({ id }) {
    return this.getBase(`global/province/${id}`);
  }
  addProvince(data) {
    return this.post("global/province", data);
  }
  editProvince(data) {
    return this.put(`global/province/${data.id}`, data);
  }
  deleteProvince({ id }) {
    return this.delete(`global/province/${id}`);
  }

  /*****************BUS TYPE - DONE*******************/
  getAllBusType() {
    return this.getAll("global/bus-type");
  }
  getBusTypeById({ id }) {
    return this.getBase(`global/bus-type/${id}`);
  }
  addBusType(data) {
    return this.post("global/bus-type", data);
  }
  editBusType(data) {
    return this.put(`global/bus-type/${data.id}`, data);
  }
  deleteBusType({ id }) {
    return this.delete(`global/bus-type/${id}`);
  }

  /*****************User Type - DONE*******************/
  getAllUsertype() {
    return this.getAll("global/user-type");
  }
  getUsertypeById({ id }) {
    return this.getBase(`global/user-type/${id}`);
  }
  addUsertype(data) {
    return this.post("global/user-type", data);
  }
  editUsertype(data) {
    return this.put(`global/user-type/${data.id}`, data);
  }
  deleteUsertype({ id }) {
    return this.delete(`global/user-type/${id}`);
  }

  /******************Status Seat - DONE******************/
  getAllStatus() {
    return this.getAll("global/status-seat");
  }
  getStatusById({ id }) {
    return this.getBase(`global/status-seat/${id}`);
  }
  addStatus(data) {
    return this.post("global/status-seat", data);
  }
  editStatus(data) {
    return this.put(`global/status-seat/${data.id}`, data);
  }
  deleteStatus({ id }) {
    return this.delete(`global/status-seat/${id}`);
  }

  /********************POINT - DONE****************/
  getAllPoint() {
    return this.getAll("global/point");
  }
  getPointById({ id }) {
    return this.getBase(`global/point/${id}`);
  }
  addPoint(data) {
    return this.post("global/point", data);
  }
  editPoint(data) {
    return this.put(`global/point/${data.id}`, data);
  }
  deletePoint({ id }) {
    return this.delete(`global/point/${id}`);
  }

  /********************ORDER STATUS - DONE****************/
  getAllOrderStatus() {
    return this.getAll("global/order-status");
  }
  getOrderStatusById({ id }) {
    return this.getBase(`global/order-status/${id}`);
  }
  addOrderStatus(data) {
    return this.post("global/order-status", data);
  }
  editOrderStatus(data) {
    return this.put(`global/order-status/${data.id}`, data);
  }
  deleteOrderStatus({ id }) {
    return this.delete(`global/order-status/${id}`);
  }

  /********************PAYMENT STATUS - DONE****************/
  getAllPaymentStatus() {
    return this.getAll("global/payment-status");
  }
  getPaymentStatusById({ id }) {
    return this.getBase(`global/payment-status/${id}`);
  }
  addPaymentStatus(data) {
    return this.post("global/payment-status", data);
  }
  editPaymentStatus(data) {
    return this.put(`global/payment-status/${data.id}`, data);
  }
  deletePaymentStatus({ id }) {
    return this.delete(`global/payment-status/${id}`);
  }
}

export const GlobalService = new GlobalManagementService();
