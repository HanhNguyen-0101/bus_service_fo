import { Form, Input } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setCallbackDrawer } from "../../../redux/actions/DrawerAction";
import { editHashtag } from "../../../redux/actions/GlobalAction";

export default function EditHashTagForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { hashtagSelected } = useSelector((state) => state.GlobalReducer);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: hashtagSelected?.id,
      name: hashtagSelected?.name,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, t("maxCharError", { max: 30 }))
        .required(t("pleaseInputName", { title: t("card") })),
    }),
    onSubmit: (values) => {
      dispatch(editHashtag(values));
    },
  });

  useEffect(() => {
    dispatch(setCallbackDrawer(formik.handleSubmit));
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
          <span className="font-bold uppercase">
            {t("id")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Input
          name="id"
          onChange={formik.handleChange}
          value={formik.values.id}
          placeholder={t("input")}
          disabled
        />
        {formik.errors.id ? (
          <div className="text-red-500 text-xs mb-2">{formik.errors.id}</div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("name", { title: t("card") })}
            <span className="text-red-500">*</span>
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