import { Form, Input } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setCallbackDrawer,
  setResetCallbackDrawer,
} from "../../../redux/actions/DrawerAction";
import { addPaymentStatus } from "../../../redux/actions/GlobalAction";

export default function AddPaymentStatusForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, t("maxCharError", {max: 30}))
        .required(t("pleaseInput", {title: t("paymentStatus")})),
    }),
    onSubmit: (values) => {
      dispatch(addPaymentStatus(values));
    },
  });

  useEffect(() => {
    dispatch(setCallbackDrawer(formik.handleSubmit));
    dispatch(setResetCallbackDrawer(formik.handleReset));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      labelCol={{
        span: 5,
      }}
      layout="horizontal"
      size="default"
      labelAlign="left"
      colon={false}
      className="px-4"
      onSubmitCapture={formik.handleSubmit}
    >
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("paymentStatus")}<span className="text-red-500">*</span>
          </span>
        }
      >
        <Input
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          placeholder={t("input")}
        />
        {formik.errors.name ? (
          <div className="text-red-500 text-xs mb-2">{formik.errors.name}</div>
        ) : null}
      </Form.Item>
    </Form>
  );
}

