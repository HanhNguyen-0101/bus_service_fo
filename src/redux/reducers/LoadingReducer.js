import { HIDE_LOADING, SHOW_LOADING } from "../contants/LoadingConstant";

const initialState = {
  isLoading: false,
};

export const LoadingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_LOADING:
      return { ...state, isLoading: true };
    case HIDE_LOADING:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
