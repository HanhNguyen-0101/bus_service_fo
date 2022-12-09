import { HIDE_LOADING, SHOW_LOADING } from "../contants/LoadingConstant";

export const showLoading = () => ({
    type: SHOW_LOADING
});
export const hideLoading = () => ({
    type: HIDE_LOADING
});