import { DatePicker, Form, InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setCallbackDrawer,
  setResetCallbackDrawer,
} from "../../../redux/actions/DrawerAction";
import { getAllStation } from "../../../redux/actions/StationAction";
import { addTrip } from "../../../redux/actions/TripAction";
import moment from "moment";

const { Option, OptGroup } = Select;

export default function AddTripForm() {
  const [imgSrc, setImgSrc] = useState("");
  const { stationList } = useSelector((state) => state.StationReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
      fromStation: "",
      toStation: "",
      startTime: "",
      price: "",
      image: "",
      tripAt: null,
    },
    validationSchema: Yup.object({
      fromStation: Yup.mixed().required(
        t("pleaseSelect", { title: t("start") })
      ),
      toStation: Yup.mixed().required(t("pleaseSelect", { title: t("end") })),
      startTime: Yup.mixed().required(
        t("pleaseInput", { title: t("time", { title: t("trip") }) })
      ),
      price: Yup.mixed().required(t("pleaseInput", { title: t("price") })),
      image: Yup.mixed().required(t("imgError")),
      tripAt: Yup.mixed().required(
        t("pleaseSelect", { title: t("startDate") })
      ),
    }),
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key === "image") {
          formData.append("image", values.image, values.image.name);
        } else if (key === "tripAt") {
          formData.append(key, moment(values[key]).format("YYYY-MM-DD HH:mm:ss"));
        } else {
          formData.append(key, values[key]);
        }
      }
      dispatch(addTrip(formData));
    },
  });

  useEffect(() => {
    dispatch(setCallbackDrawer(formik.handleSubmit));
    dispatch(setResetCallbackDrawer(formik.handleReset));
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
          onChange={handleChange("tripAt")}
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
            {t("image")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <input
          type="file"
          onChange={handleChangeImageSrc}
          accept="image/png, image/jpeg,image/gif,image/png"
        />
        {formik.errors.image ? (
          <div className="text-red-500 text-xs mb-2">{formik.errors.image}</div>
        ) : null}
        {imgSrc && <img alt="img" src={imgSrc} className="w-auto my-3" />}
      </Form.Item>
    </Form>
  );
}
