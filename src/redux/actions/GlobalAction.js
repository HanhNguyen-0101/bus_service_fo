import {
  ADD_ARTICLE_SAGA,
  ADD_BANNER_SAGA,
  ADD_BUSTYPE_SAGA,
  ADD_HASHTAG_SAGA,
  ADD_ORDER_STATUS_SAGA,
  ADD_PAYMENT_METHOD_SAGA,
  ADD_PAYMENT_STATUS_SAGA,
  ADD_POINT_SAGA,
  ADD_PROVINCE_SAGA,
  ADD_STATUS_SAGA,
  ADD_USERTYPE_SAGA,
  DELETE_ARTICLE_SAGA,
  DELETE_BANNER_SAGA,
  DELETE_BUSTYPE_SAGA,
  DELETE_HASHTAG_SAGA,
  DELETE_ORDER_STATUS_SAGA,
  DELETE_PAYMENT_METHOD_SAGA,
  DELETE_PAYMENT_STATUS_SAGA,
  DELETE_POINT_SAGA,
  DELETE_PROVINCE_SAGA,
  DELETE_STATUS_SAGA,
  DELETE_USERTYPE_SAGA,
  EDIT_ARTICLE_SAGA,
  EDIT_BANNER_SAGA,
  EDIT_BUSTYPE_SAGA,
  EDIT_HASHTAG_SAGA,
  EDIT_ORDER_STATUS_SAGA,
  EDIT_PAYMENT_METHOD_SAGA,
  EDIT_PAYMENT_STATUS_SAGA,
  EDIT_POINT_SAGA,
  EDIT_PROVINCE_SAGA,
  EDIT_STATUS_SAGA,
  EDIT_USERTYPE_SAGA,
  FIND_ARTICLE_BY_HASHTAG_AND_TITLE_SAGA,
  FIND_ARTICLE_BY_ID_SAGA,
  FIND_BANNER_BY_ID_SAGA,
  FIND_BUSTYPE_BY_ID_SAGA,
  FIND_HASHTAG_BY_ID_SAGA,
  FIND_HASHTAG_BY_NAME_SAGA,
  FIND_ORDER_STATUS_BY_ID_SAGA,
  FIND_PAYMENT_METHOD_BY_ID_SAGA,
  FIND_PAYMENT_STATUS_BY_ID_SAGA,
  FIND_POINT_BY_ID_SAGA,
  FIND_PROVINCE_BY_ID_SAGA,
  FIND_STATUS_BY_ID_SAGA,
  FIND_USERTYPE_BY_ID_SAGA,
  GET_ALL_BANNER_SAGA,
  GET_ALL_BUSTYPE_SAGA,
  GET_ALL_HASHTAG_SAGA,
  GET_ALL_ORDER_STATUS_SAGA,
  GET_ALL_PAYMENT_METHOD_SAGA,
  GET_ALL_PAYMENT_STATUS_SAGA,
  GET_ALL_POINT_SAGA,
  GET_ALL_PROVINCE_SAGA,
  GET_ALL_STATUS_SAGA,
  GET_ALL_USERTYPE_SAGA,
  GET_ARTICLE_SAGA,
} from "../contants/GlobalConstant";

export const getAllArticle = () => ({
  type: GET_ARTICLE_SAGA,
});
export const addArticle = (data) => ({
  type: ADD_ARTICLE_SAGA,
  payload: data,
});
export const editArticle = (data) => ({
  type: EDIT_ARTICLE_SAGA,
  payload: data,
});
export const deleteArticle = ({ id }) => ({
  type: DELETE_ARTICLE_SAGA,
  payload: { id },
});
export const findArticleById = ({ id }) => ({
  type: FIND_ARTICLE_BY_ID_SAGA,
  payload: { id },
});
export const filterArticalByHashTagAndTitle = ({hashtag, title = ''}) => ({
  type: FIND_ARTICLE_BY_HASHTAG_AND_TITLE_SAGA,
  payload: {hashtag, title}
});
/******************Banner - DONE******************/
export const getAllBanner = () => ({
  type: GET_ALL_BANNER_SAGA,
});
export const addBanner = (data) => ({
  type: ADD_BANNER_SAGA,
  payload: data,
});
export const editBanner = (data) => ({
  type: EDIT_BANNER_SAGA,
  payload: data,
});
export const deleteBanner = ({ id }) => ({
  type: DELETE_BANNER_SAGA,
  payload: { id },
});
export const findBannerById = ({ id }) => ({
  type: FIND_BANNER_BY_ID_SAGA,
  payload: { id },
});
/******************HashTag - DONE******************/
export const getAllHashtag = () => ({
  type: GET_ALL_HASHTAG_SAGA,
});
export const addHashtag = (data) => ({
  type: ADD_HASHTAG_SAGA,
  payload: data,
});
export const editHashtag = (data) => ({
  type: EDIT_HASHTAG_SAGA,
  payload: data,
});
export const deleteHashtag = ({ id }) => ({
  type: DELETE_HASHTAG_SAGA,
  payload: { id },
});
export const findHashtagById = ({ id }) => ({
  type: FIND_HASHTAG_BY_ID_SAGA,
  payload: { id },
});
export const findHashtagByName = (name) => ({
  type: FIND_HASHTAG_BY_NAME_SAGA,
  payload: name,
});
/******************Province - DONE******************/
export const getAllProvince = () => ({
  type: GET_ALL_PROVINCE_SAGA,
});
export const addProvince = (data) => ({
  type: ADD_PROVINCE_SAGA,
  payload: data,
});
export const editProvince = (data) => ({
  type: EDIT_PROVINCE_SAGA,
  payload: data,
});
export const deleteProvince = ({ id }) => ({
  type: DELETE_PROVINCE_SAGA,
  payload: { id },
});
export const findProvinceById = ({ id }) => ({
  type: FIND_PROVINCE_BY_ID_SAGA,
  payload: { id },
});

/******************Point - DONE******************/
export const getAllPoint = () => ({
  type: GET_ALL_POINT_SAGA,
});
export const addPoint = (data) => ({
  type: ADD_POINT_SAGA,
  payload: data,
});
export const editPoint = (data) => ({
  type: EDIT_POINT_SAGA,
  payload: data,
});
export const deletePoint = ({ id }) => ({
  type: DELETE_POINT_SAGA,
  payload: { id },
});
export const findPointById = ({ id }) => ({
  type: FIND_POINT_BY_ID_SAGA,
  payload: { id },
});

/******************PaymentStatus - DONE******************/
export const getAllPaymentStatus = () => ({
  type: GET_ALL_PAYMENT_STATUS_SAGA,
});
export const addPaymentStatus = (data) => ({
  type: ADD_PAYMENT_STATUS_SAGA,
  payload: data,
});
export const editPaymentStatus = (data) => ({
  type: EDIT_PAYMENT_STATUS_SAGA,
  payload: data,
});
export const deletePaymentStatus = ({ id }) => ({
  type: DELETE_PAYMENT_STATUS_SAGA,
  payload: { id },
});
export const findPaymentStatusById = ({ id }) => ({
  type: FIND_PAYMENT_STATUS_BY_ID_SAGA,
  payload: { id },
});


/******************OrderStatus - DONE******************/
export const getAllOrderStatus = () => ({
  type: GET_ALL_ORDER_STATUS_SAGA,
});
export const addOrderStatus = (data) => ({
  type: ADD_ORDER_STATUS_SAGA,
  payload: data,
});
export const editOrderStatus = (data) => ({
  type: EDIT_ORDER_STATUS_SAGA,
  payload: data,
});
export const deleteOrderStatus = ({ id }) => ({
  type: DELETE_ORDER_STATUS_SAGA,
  payload: { id },
});
export const findOrderStatusById = ({ id }) => ({
  type: FIND_ORDER_STATUS_BY_ID_SAGA,
  payload: { id },
});

/******************Bus Type - DONE******************/
export const getAllBusType = () => ({
  type: GET_ALL_BUSTYPE_SAGA,
});
export const addBusType = (data) => ({
  type: ADD_BUSTYPE_SAGA,
  payload: data,
});
export const editBusType = (data) => ({
  type: EDIT_BUSTYPE_SAGA,
  payload: data,
});
export const deleteBusType = ({ id }) => ({
  type: DELETE_BUSTYPE_SAGA,
  payload: { id },
});
export const findBusTypeById = ({ id }) => ({
  type: FIND_BUSTYPE_BY_ID_SAGA,
  payload: { id },
});
/******************Payment Method - DONE******************/
export const getAllPaymentMethod = () => ({
  type: GET_ALL_PAYMENT_METHOD_SAGA,
});
export const addPaymentMethod = (data) => ({
  type: ADD_PAYMENT_METHOD_SAGA,
  payload: data,
});
export const editPaymentMethod = (data) => ({
  type: EDIT_PAYMENT_METHOD_SAGA,
  payload: data,
});
export const deletePaymentMethod = ({ id }) => ({
  type: DELETE_PAYMENT_METHOD_SAGA,
  payload: { id },
});
export const findPaymentMethodById = ({ id }) => ({
  type: FIND_PAYMENT_METHOD_BY_ID_SAGA,
  payload: { id },
});
/******************User Type - DONE******************/
export const getAllUserType = () => ({
  type: GET_ALL_USERTYPE_SAGA,
});
export const addUserType = (data) => ({
  type: ADD_USERTYPE_SAGA,
  payload: data,
});
export const editUserType = (data) => ({
  type: EDIT_USERTYPE_SAGA,
  payload: data,
});
export const deleteUserType = ({ id }) => ({
  type: DELETE_USERTYPE_SAGA,
  payload: { id },
});
export const findUserTypeById = ({ id }) => ({
  type: FIND_USERTYPE_BY_ID_SAGA,
  payload: { id },
});
/******************Status Seat - DONE******************/
export const getAllStatus = () => ({
  type: GET_ALL_STATUS_SAGA,
});
export const addStatus = (data) => ({
  type: ADD_STATUS_SAGA,
  payload: data,
});
export const editStatus = (data) => ({
  type: EDIT_STATUS_SAGA,
  payload: data,
});
export const deleteStatus = ({ id }) => ({
  type: DELETE_STATUS_SAGA,
  payload: { id },
});
export const findStatusById = ({ id }) => ({
  type: FIND_STATUS_BY_ID_SAGA,
  payload: { id },
});
