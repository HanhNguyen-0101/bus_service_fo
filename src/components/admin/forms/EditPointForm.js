import { Checkbox, Form, Input, TimePicker } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setCallbackDrawer } from "../../../redux/actions/DrawerAction";
import { editPoint } from "../../../redux/actions/GlobalAction";
import moment from "moment";

export default function EditPointForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { pointSelected } = useSelector((state) => state.GlobalReducer);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: pointSelected?.id,
      station: pointSelected?.station,
      address: pointSelected?.address,
      position: pointSelected?.position,
      shuttle: pointSelected?.shuttle,
      time: pointSelected ? moment(pointSelected.time) : null,
    },
    validationSchema: Yup.object({
      station: Yup.string().required(t("pleaseInput", { title: t("place") })),
      address: Yup.string().required(t("pleaseInput", { title: t("address") })),
      position: Yup.string().required(
        t("pleaseInput", { title: t("position") })
      ),
      time: Yup.mixed().required(t("pleaseSelect", { title: t("time", {title: ""}) })),
    }),
    onSubmit: (values) => {
      for (let key in values) {
        if (key === "time") {
          values.time = moment(values[key]).format("YYYY-MM-DD HH:mm:ss");
        }
      }
      dispatch(editPoint(values));
    },
  });
  const handleChange = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
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
            {t("place")}
            <span className="text-red-500">*</span>
          </span>
        }
      >
        <Input
          name="station"
          onChange={formik.handleChange}
          value={formik.values.station}
          placeholder={t("input")}
        />
        {formik.errors.station ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.station}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("address")}
            <span className="text-red-500">*</span>
          </span>
        }
      >
        <Input
          name="address"
          onChange={formik.handleChange}
          value={formik.values.address}
          placeholder={t("input")}
        />
        {formik.errors.address ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.address}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("time", { title: "" })} <span className="text-red-500">*</span>
          </span>
        }
      >
        <TimePicker
          showTime={{
            format: "HH:mm",
          }}
          format="HH:mm"
          name="time"
          placeholder={t("select")}
          onChange={handleChange("time")}
        />
        {formik.errors.time ? (
          <div className="text-red-500 text-xs mb-2">{formik.errors.time}</div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={<span className="font-bold capitalize">{t("position")}</span>}
      >
        <Input
          name="position"
          onChange={formik.handleChange}
          value={formik.values.position}
          placeholder={t("input")}
        />
        {formik.errors.position ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.position}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={<span className="font-bold capitalize">{t("show")}</span>}
      >
        <Checkbox
          name="shuttle"
          checked={formik.values.shuttle}
          onChange={formik.handleChange}
        />
        {formik.errors.shuttle ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.shuttle}
          </div>
        ) : null}
      </Form.Item>
    </Form>
  );
}
