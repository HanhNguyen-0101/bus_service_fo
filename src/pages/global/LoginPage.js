import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { login } from "../../redux/actions/UserAction";

export default function LoginPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t("pleaseInput", {title: t("email")})).required(t("pleaseInput", {title: t("email")})),
      password: Yup.string().required(t("pleaseInput", {title: t("password")})),
    }),
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  return (
    <div className="px-12 flex justify-center items-center flex-col">
      <h2
        className="uppercase text-center text-4xl text-alibus font-display font-semibold lg:text-left xl:text-5xl
xl:text-bold"
      >
        {t("login")}
      </h2>
      <div className="mt-12 w-full">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="capitalize text-sm font-bold text-gray-700 tracking-wide">
              {t("email")}
            </div>
            <input
              className="w-full text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-alibus"
              type="input"
              name="email"
              value={formik.values.email}
              placeholder={t("input")}
              onChange={formik.handleChange}
            />
            {formik.errors.email ? (
              <div className="text-alibus text-sm">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <div className="capitalize text-sm font-bold text-gray-700 tracking-wide">
                {t("password")}
              </div>
            </div>
            <input
              className="w-full text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-alibus"
              type="password"
              name="password"
              value={formik.values.password}
              placeholder={t("input")}
              onChange={formik.handleChange}
            />
            {formik.errors.password ? (
              <div className="text-alibus text-sm">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="bg-alibus text-black capitalize text-2xl p-3 w-full rounded tracking-wide
            font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-alibus
            shadow-lg"
            >
              {t("login")}
            </button>
          </div>
        </form>
        <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
          {t("noAccount")}
          <NavLink
            className="cursor-pointer pl-1 text-alibus hover:text-alibus"
            to="/register"
          >
            {t("register")}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
