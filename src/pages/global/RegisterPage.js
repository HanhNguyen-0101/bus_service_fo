import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { register } from "../../redux/actions/UserAction";
import { USER_TYPE } from "../../utils/constant";
import { history } from "../../utils/history";

export default function RegisterPage() {
  const { userLogin } = useSelector((state) => state.UserReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
      numberPhone: "",
      name: "",
      type: USER_TYPE.USER,
      avatar: "https://picsum.photos/200/300",
    },
    validationSchema: Yup.object({
      password: Yup.string().required(t("pleaseInput", {title: t("password")})),
      name: Yup.string().max(30, t("maxCharError", {max: 30})).required(t("pleaseInput", {title: t("account")})),
      email: Yup.string().email(t("pleaseInput", {title: t("email")})).required(t("pleaseInput", {title: t("email")})),
      numberPhone: Yup.string().matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        t("pleaseInput", {title: t("phone")})
      ),
    }),
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });
  if (userLogin.name) {
    history.push("/");
    window.location.reload();
  } else {
    return (
      <div className="px-12 flex justify-center items-center flex-col">
        <h2
          className="uppercase text-center text-4xl text-alibus font-display font-semibold lg:text-left xl:text-5xl
  xl:text-bold"
        >
          {t("register")}
        </h2>
        <div className="mt-12 w-full">
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide capitalize">
                  {t("account")}
                </div>
              </div>
              <input
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-alibus"
                type="text"
                name="name"
                value={formik.values.name}
                placeholder={t("input")}
                onChange={formik.handleChange}
              />
              {formik.errors.name ? (
                <div className="text-alibus text-sm">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide capitalize">
                  {t("email")}
                </div>
              </div>
              <input
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-alibus"
                type="email"
                name="email"
                value={formik.values.email}
                placeholder={t("input")}
                onChange={formik.handleChange}
              />
              {formik.errors.email ? (
                <div className="text-alibus text-sm">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide capitalize">
                  {t("password")}
                </div>
              </div>
              <input
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-alibus"
                type="password"
                name="password"
                value={formik.values.password}
                placeholder={t("input")}
                onChange={formik.handleChange}
              />
              {formik.errors.password ? (
                <div className="text-alibus text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide capitalize">
                  {t("phone")}
                </div>
              </div>
              <input
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-alibus"
                type="text"
                name="numberPhone"
                value={formik.values.numberPhone}
                placeholder={t("input")}
                onChange={formik.handleChange}
              />
              {formik.errors.numberPhone ? (
                <div className="text-alibus text-sm">
                  {formik.errors.numberPhone}
                </div>
              ) : null}
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="bg-alibus text-black rounded capitalize text-2xl p-3 w-full tracking-wide
              font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-alibus
              shadow-lg"
              >
                {t("register")}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
