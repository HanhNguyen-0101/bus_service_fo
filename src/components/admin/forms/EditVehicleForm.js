import { Form, Input, InputNumber, Select, Space, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setCallbackDrawer } from "../../../redux/actions/DrawerAction";
import { getAllBusCompany } from "../../../redux/actions/BusCompanyAction";
import { editVehicle } from "../../../redux/actions/VehicleAction";
import { getTrip } from "../../../redux/actions/TripAction";
import {
  getAllBusType,
  getAllPoint,
} from "../../../redux/actions/GlobalAction";
import _ from "lodash";

const { Option, OptGroup } = Select;

export default function EditVehicleForm() {
  const [imgSrc, setImgSrc] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { vehicleSelected } = useSelector((state) => state.VehicleReducer);
  const { busCompanies } = useSelector((state) => state.BusCompanyReducer);
  const { tripList } = useSelector((state) => state.TripReducer);
  const { busTypeList, pointList } = useSelector(
    (state) => state.GlobalReducer
  );
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
      ...vehicleSelected?.promo,
      ...vehicleSelected?.point,
      id: vehicleSelected?.id,
      name: vehicleSelected?.name,
      numberSeat: vehicleSelected?.numberSeat,
      numberFloor: vehicleSelected?.numberFloor,
      busTypeId: vehicleSelected?.busTypeId,
      tripId: vehicleSelected?.tripId,
      promo: vehicleSelected?.promo,
      point: vehicleSelected?.point,
      passengerCarCompaniesId: vehicleSelected?.passengerCarCompaniesId,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, t("maxCharError", { max: 30 }))
        .required(t("pleaseInputName", { title: t("company") })),
      numberFloor: Yup.mixed().required(
        t("pleaseInput", { title: t("floor") })
      ),
      numberSeat: Yup.mixed().required(t("pleaseInput", { title: t("row") })),
      busTypeId: Yup.mixed().required(
        t("pleaseSelect", { title: t("type", { title: t("bus") }) })
      ),
      passengerCarCompaniesId: Yup.mixed().required(
        t("pleaseSelect", { title: t("company") })
      ),
    }),
    onSubmit: (values) => {
      const promo = {};
      _.map(values.promo, function (value, key) {
        return promo[key] = values[key];
      });
      values.promo = JSON.stringify(promo);

      const point = {};
      _.map(values.point, function (value, key) {
        return point[key] = values[key];
      });
      values.point = JSON.stringify(point);

      let formData = new FormData();
      for (let key in values) {
        if (key !== "image") {
          formData.append(key, values[key]);
        } else {
          if (values.image !== null) {
            formData.append("image", values.image, values.image.name);
          } else {
            formData.append(key, values[key]);
          }
        }
      }
      dispatch(editVehicle(formData));
    },
  });
  useEffect(() => {
    dispatch(getAllBusType());
    dispatch(getTrip());
    dispatch(getAllBusCompany());
    dispatch(getAllPoint());
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
            {t("name", { title: t("bus") })}{" "}
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
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("floor")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <InputNumber
          value={formik.values.numberFloor}
          onChange={handleChange("numberFloor")}
          min={1}
          max={5}
        />
        {formik.errors.numberFloor ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.numberFloor}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("row")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <InputNumber
          value={formik.values.numberSeat}
          onChange={handleChange("numberSeat")}
          min={2}
          max={100}
        />
        {formik.errors.numberSeat ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.numberSeat}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("type", { title: t("bus") })}{" "}
            <span className="text-red-500">*</span>
          </span>
        }
      >
        <Select
          name="busTypeId"
          placeholder={t("select")}
          value={formik.values.busTypeId}
          onChange={handleChange("busTypeId")}
        >
          {busTypeList?.map((type, idx) => {
            return (
              <Option key={`type-${idx}`} value={type.id} className="uppercase">
                {type.name}
              </Option>
            );
          })}
        </Select>
        {formik.errors.busTypeId ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.busTypeId}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("company")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Select
          onChange={handleChange("passengerCarCompaniesId")}
          name="passengerCarCompaniesId"
          value={formik.values.passengerCarCompaniesId}
        >
          <OptGroup label={t("company")}>
            {busCompanies?.map((company, idx) => {
              return (
                <Option key={`city-${idx}`} value={company.id}>
                  {company.name}
                </Option>
              );
            })}
          </OptGroup>
        </Select>
        {formik.errors.passengerCarCompaniesId ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.passengerCarCompaniesId}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("trip")}
            <span className="text-red-500">*</span>
          </span>
        }
      >
        <Select
          name="tripId"
          placeholder={t("select")}
          value={formik.values.tripId}
          onChange={handleChange("tripId")}
        >
          {tripList?.map((trip, idx) => {
            return (
              <Option key={`trip-${idx}`} value={trip.id}>
                {trip.fromStationObj.name} - {trip.toStationObj.name}
              </Option>
            );
          })}
        </Select>
        {formik.errors.tripId ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.tripId}
          </div>
        ) : null}
      </Form.Item>
      {formik.values.promo &&
        _.map(formik.values.promo, function (value, key) {
          return (
            <Form.Item
              className="mb-1"
              key={key}
              label={
                <span className="font-bold capitalize">
                  {key}
                  <span className="text-red-500">*</span>
                </span>
              }
            >
              <InputNumber
                value={formik.values[key]}
                onChange={handleChange(key)}
                min={0}
              />
            </Form.Item>
          );
        })}
      {formik.values.point &&
        _.map(formik.values.point, function (value, key) {
          return (
            <Form.Item
              className="mb-1"
              key={key}
              label={
                <span className="font-bold capitalize">
                  {t(key)}
                  <span className="text-red-500">*</span>
                </span>
              }
            >
              <Select
                mode="multiple"
                placeholder={t("select")}
                value={formik.values[key]}
                onChange={handleChange(key)}
              >
                {pointList?.map((point, idx) => {
                  return (
                    <Option key={`point-${idx}`} value={point.id}>
                      <Space>
                        {point.station}
                        {point.shuttle ? (
                          <Tag color="green"> {t("shuttle")}</Tag>
                        ) : (
                          ""
                        )}
                      </Space>
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          );
        })}
      <Form.Item
        className="mb-1"
        label={<span className="font-bold capitalize">{t("image")}</span>}
      >
        <input
          type="file"
          onChange={handleChangeImageSrc}
          accept="image/png, image/jpeg,image/gif,image/png"
        />
        {(imgSrc || vehicleSelected.image) && (
          <img
            alt="img"
            src={imgSrc === "" ? vehicleSelected.image : imgSrc}
            className="w-auto my-3"
          />
        )}
      </Form.Item>
    </Form>
  );
}
