import { Article, mapArticleHashTag } from "../../models/GlobalModel";
import {
  FIND_ARTICLE_BY_HASHTAG_AND_TITLE,
  FIND_ARTICLE_BY_ID,
  FIND_BANNER_BY_ID,
  FIND_BUSTYPE_BY_ID,
  FIND_HASHTAG_BY_ID,
  FIND_HASHTAG_BY_NAME,
  FIND_ORDER_STATUS_BY_ID,
  FIND_PAYMENT_METHOD_BY_ID,
  FIND_PAYMENT_STATUS_BY_ID,
  FIND_POINT_BY_ID,
  FIND_PROVINCE_BY_ID,
  FIND_STATUS_BY_ID,
  FIND_USERTYPE_BY_ID,
  GET_ALL_BANNER,
  GET_ALL_BUSTYPE,
  GET_ALL_HASHTAG,
  GET_ALL_ORDER_STATUS,
  GET_ALL_PAYMENT_METHOD,
  GET_ALL_PAYMENT_STATUS,
  GET_ALL_POINT,
  GET_ALL_PROVINCE,
  GET_ALL_STATUS,
  GET_ALL_USERTYPE,
  GET_ARTICLE,
} from "../contants/GlobalConstant";

const initialState = {
  articles: [],
  articleSelected: {},
  bannerList: [],
  bannerSelected: {},
  hashtagList: [],
  hashtagSelected: {},
  userTypeList: [],
  userTypeSelected: {},
  statusList: [],
  statusSelected: {},
  provinceList: [],
  provinceSelected: {},
  pointList: [],
  pointSelected: {},
  paymentStatusList: [],
  paymentStatusSelected: {},
  orderStatusList: [],
  orderStatusSelected: {},
  busTypeList: [],
  busTypeSelected: {},
  paymentMethodList: [],
  paymentMethodSelected: {},
};

export const GlobalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ARTICLE:
      const articles = payload?.map((i) => new Article(i));
      return {
        ...state,
        articles: mapArticleHashTag(articles, state.hashtagList),
      };
    case FIND_ARTICLE_BY_ID:
      return { ...state, articleSelected: new Article(payload) };
    case FIND_ARTICLE_BY_HASHTAG_AND_TITLE:
      return { ...state, articleSelected: new Article(payload) };
    case GET_ALL_BANNER:
      return { ...state, bannerList: payload };
    case FIND_BANNER_BY_ID:
      return { ...state, bannerSelected: payload };
    case GET_ALL_HASHTAG:
      return { ...state, hashtagList: payload };
    case FIND_HASHTAG_BY_ID:
      return { ...state, hashtagSelected: payload };
    case GET_ALL_USERTYPE:
      return { ...state, userTypeList: payload };
    case FIND_USERTYPE_BY_ID:
      return { ...state, userTypeSelected: payload };
    case GET_ALL_STATUS:
      return { ...state, statusList: payload };
    case FIND_STATUS_BY_ID:
      return { ...state, statusSelected: payload };
    case GET_ALL_PROVINCE:
      return { ...state, provinceList: payload };
    case FIND_PROVINCE_BY_ID:
      return { ...state, provinceSelected: payload };
    case GET_ALL_POINT:
      return { ...state, pointList: payload };
    case FIND_POINT_BY_ID:
      return { ...state, pointSelected: payload };
    case GET_ALL_PAYMENT_STATUS:
      return { ...state, paymentStatusList: payload };
    case FIND_PAYMENT_STATUS_BY_ID:
      return { ...state, paymentStatusSelected: payload };
    case GET_ALL_ORDER_STATUS:
      return { ...state, orderStatusList: payload };
    case FIND_ORDER_STATUS_BY_ID:
      return { ...state, orderStatusSelected: payload };
    case GET_ALL_BUSTYPE:
      return { ...state, busTypeList: payload };
    case FIND_BUSTYPE_BY_ID:
      return { ...state, busTypeSelected: payload };
    case GET_ALL_PAYMENT_METHOD:
      return { ...state, paymentMethodList: payload };
    case FIND_PAYMENT_METHOD_BY_ID:
      return { ...state, paymentMethodSelected: payload };
    case FIND_HASHTAG_BY_NAME: {
      return { ...state, hashtagSelected: payload };
    }
    default:
      return state;
  }
};
