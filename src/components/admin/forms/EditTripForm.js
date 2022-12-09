import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setCallbackDrawer } from "../../../redux/actions/DrawerAction";
import { getAllStation } from "../../../redux/actions/StationAction";
import { editTrip } from "../../../redux/actions/TripAction";
import moment from "moment";

const { Option, OptGroup } = Select;

export default function EditTripForm() {
  const [imgSrc, setImgSrc] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { tripSelected } = useSelector((state) => state.TripReducer);
  const { stationList } = useSelector((state) => state.StationReducer);
  const handleChange = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeImageSrc = async (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      await formik.setFieldValue("image", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: tripSelected?.id,
      fromStation: tripSelected?.fromStation,
      toStation: tripSelected?.toStation,
      startTime: tripSelected?.startTime,
      price: tripSelected?.price,
      tripAt: tripSelected ? moment(tripSelected.tripAt) : null,
    },
    validationSchema: Yup.object({
      fromStation: Yup.mixed().required(t("pleaseSelect", {title: t("start")})),
      toStation: Yup.mixed().required(t("pleaseSelect", {title: t("end")})),
      startTime: Yup.mixed().required(t("pleaseInput", {title: t("time", {title: t("trip")})})),
      price: Yup.mixed().required(t("pleaseInput", {title: t("price")})),
      tripAt: Yup.mixed().required(t("pleaseSelect", {title: t("startDate")})),
    }),
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key === "image") {
          if (values.image !== null) {
            formData.append("image", values.image, values.image.name);
          } else {
            formData.append(key, values.logo);
          }
        } else if (key === "tripAt") {
          formData.append(key, moment(values[key]).format("YYYY-MM-DD HH:mm:ss"));
        } else {
          formData.append(key, values[key]);
        }
      }
      dispatch(editTrip(formData));
    },
  });

  useEffect(() => {
    dispatch(setCallbackDrawer(formik.handleSubmit));
    dispatch(getAllStation());
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
            {t("start")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Select
          onChange={handleChange("fromStation")}
          name="fromStation"
          value={formik.values.fromStation}
        >
          <OptGroup label="Bus station">
            {stationList?.map((fromStation, idx) => {
              return (
                <Option key={`station-${idx}`} value={fromStation.id}>
                  {fromStation.name} - {fromStation.provinceObj.name}
                </Option>
              );
            })}
          </OptGroup>
        </Select>
        {formik.errors.fromStation ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.fromStation}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("end")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Select
          onChange={handleChange("toStation")}
          name="toStation"
          value={formik.values.toStation}
        >
          <OptGroup label="Bus station">
            {stationList?.map((toStation, idx) => {
              return (
                <Option key={`station-${idx}`} value={toStation.id}>
                  {toStation.name} - {toStation.provinceObj.name}
                </Option>
              );
            })}
          </OptGroup>
        </Select>
        {formik.errors.toStation ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.toStation}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("startDate")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <DatePicker
          name="tripAt"
          onChange={handleChange('tripAt')}
          placeholder={t("select")}
        />
        {formik.errors.tripAt ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.tripAt}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("timeGo")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <InputNumber
          value={formik.values.startTime}
          onChange={handleChange("startTime")}
          min={1}
        />
        {formik.errors.startTime ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.startTime}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("price")} (VND) <span className="text-red-500">*</span>
          </span>
        }
      >
        <InputNumber
          value={formik.values.price}
          onChange={handleChange("price")}
          min={1000}
        />
        {formik.errors.price ? (
          <div className="text-red-500 text-xs mb-2">{formik.errors.price}</div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("image")}
          </span>
        }
      >
        <input
          type="file"
          onChange={handleChangeImageSrc}
          accept="image/png, image/jpeg,image/gif,image/png"
        />
        {(imgSrc || tripSelected.image) && (
          <img
            alt="img"
            src={imgSrc === "" ? tripSelected.image : imgSrc}
            className="w-auto my-3"
          />
        )}
      </Form.Item>
    </Form>
  );
}
