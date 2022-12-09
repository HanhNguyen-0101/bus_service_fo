import { Form, Input } from "antd";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setSubmitNextCheckout, setUserCheckoutCurrent } from "../../../redux/actions/CheckoutAction";
import { history } from "../../../utils/history";

export default function BusInfo() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { userLogin } = useSelector((state) => state.UserReducer);
  const { bookingData } = useSelector((state) => state.CheckoutReducer);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: bookingData.userBooking ? bookingData.userBooking.email : userLogin?.email,
      numberPhone: bookingData.userBooking ? bookingData.userBooking.numberPhone : userLogin?.numberPhone,
      name: bookingData.userBooking ? bookingData.userBooking.name : userLogin?.name,
      note: bookingData.userBooking?.note,
      identify: bookingData.userBooking?.identify,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(30, t("maxCharError", {max: 30})).required(t("pleaseInput", {title: t("fullname")})),
      identify: Yup.string().min(9, t("minCharError", {min: 9})).max(11, t("maxCharError", {max: 11})).required(t("pleaseInputIdentify")),
      email: Yup.string()
        .email(t("pleaseInput", {title: t("email")}))
        .required(t("pleaseInput", {title: t("email")})),
      numberPhone: Yup.string().required(t("pleaseInput", {title: t("phone")})).matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        t("pleaseInput", {title: t("phone")})
      ),
    }),
    onSubmit: (values) => {
      dispatch(setUserCheckoutCurrent(values));
      history.push('/checkout');
      window.location.reload();
    },
  });

  useEffect(() => {
    dispatch(setSubmitNextCheckout(formik.handleSubmit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <span className="alert alert-warning py-2 px-3 text-xs sm:text-sm" role="alert">
        {t("enterInformationTxt1")}
      </span>
      <div className="mt-6 mx-auto">
        <Form
          layout="vertical"
          className="max-w-lg m-auto"
          size="large"
          onSubmitCapture={formik.handleSubmit}
        >
          <Form.Item label={<b className="capitalize">{t("fullname")}</b>} required>
            <Input
              className="rounded"
              placeholder={t("input")}
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name ? (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.name}
              </div>
            ) : null}
          </Form.Item>
          <Form.Item label={<b className="capitalize">{t("phone")}</b>} required>
            <Input
              className="rounded"
              placeholder={t("input")}
              name="numberPhone"
              onChange={formik.handleChange}
              value={formik.values.numberPhone}
            />
            {formik.errors.numberPhone ? (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.numberPhone}
              </div>
            ) : null}
          </Form.Item>
          <Form.Item label={<b>{t("identifyId")}</b>} required>
            <Input
              className="rounded"
              placeholder={t("input")}
              name="identify"
              onChange={formik.handleChange}
              value={formik.values.identify}
            />
            {formik.errors.identify ? (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.identify}
              </div>
            ) : null}
          </Form.Item>
          <Form.Item label={<b>{t("e-Receive")}</b>} required>
            <Input
              className="rounded"
              placeholder={t("input")}
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.email}
              </div>
            ) : null}
          </Form.Item>
          <Form.Item label={<b>{t("otherRequest")}</b>}>
            <Input.TextArea
              className="rounded"
              name="note"
              onChange={formik.handleChange}
              value={formik.values.note}
              placeholder={t("otherRequestPld")}
            />
            {formik.errors.note ? (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.note}
              </div>
            ) : null}
          </Form.Item>
          <div>
            {t("clicking", {name: t("next")})}{" "}
            <NavLink
              to="/blog/global/privacy-policy"
              className="font-bold text-alibus underline hover:text-alibus focus:text-alibus"
            >
              {t("privacy")}
            </NavLink>{" "}
            {t("and")}{" "}
            <NavLink
              to="/blog/global/tandc"
              className="font-bold text-alibus underline hover:text-alibus focus:text-alibus"
            >
              {t("tandc")}
            </NavLink>
          </div>
        </Form>
      </div>
    </div>
  );
}
