import { Form, Input, Select, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setCallbackDrawer,
  setResetCallbackDrawer,
} from "../../../redux/actions/DrawerAction";
import { addSeat, getAllSeat } from "../../../redux/actions/SeatAction";
import { groupSeatByVehicle } from "../../../models/SeatModel";
import { getAllVehicle } from "../../../redux/actions/VehicleAction";
import { getAllStatus } from "../../../redux/actions/GlobalAction";
import { SEAT_STATUS } from "../../../utils/constant";

const { Option, OptGroup } = Select;

export default function AddSeatForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { seatList } = useSelector((state) => state.SeatReducer);
  const { vehicleList } = useSelector((state) => state.VehicleReducer);
  const { statusList } = useSelector((state) => state.GlobalReducer);
  const [seatByVehicle, setSeatByVehicle] = useState(null);

  const seatGroup = groupSeatByVehicle(seatList);

  const handleChange = (name) => {
    return (value) => {
      if (name === "vehicledId") {
        setSeatByVehicle(value);
      }
      formik.setFieldValue(name, value);
    };
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      vehicledId: "",
      seatStatusId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, t("maxCharError", {max: 30}))
        .required(t("pleaseInputName", {title: t("seat")})),
      vehicledId: Yup.mixed().required(t("pleaseSelect", {title: t("bus")})),
      seatStatusId: Yup.mixed().required(t("pleaseSelect", {title: t("status")})),
    }),
    onSubmit: (values) => {
      dispatch(addSeat(values));
    },
  });

  useEffect(() => {
    dispatch(getAllVehicle());
    dispatch(getAllSeat());
    dispatch(getAllStatus());
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
            {t("name", {title: t("seat")})} <span className="text-red-500">*</span>
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
            {t("status")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Select
          onChange={handleChange("seatStatusId")}
          name="seatStatusId"
          value={formik.values.seatStatusId}
        >
          <OptGroup label="Status">
            {statusList?.map((status, idx) => {
              let color =
                status.name === SEAT_STATUS.AVAILABLE ? "green" : "red";
              return (
                <Option key={idx} value={status.id}>
                  <Tag color={color}>{status.name}</Tag>
                </Option>
              );
            })}
          </OptGroup>
        </Select>
        {formik.errors.seatStatusId ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.seatStatusId}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("bus")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Select
          onChange={handleChange("vehicledId")}
          name="vehicledId"
          value={formik.values.vehicledId}
        >
          <OptGroup label="Vehicles">
            {vehicleList?.map((vehicled, idx) => {
              return (
                <Option key={`vehicle-${idx}`} value={vehicled.id}>
                  {`${vehicled.name} - ${vehicled.busCompanyObj.name}`}
                </Option>
              );
            })}
          </OptGroup>
        </Select>
        {formik.errors.vehicledId ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.vehicledId}
          </div>
        ) : null}
      </Form.Item>
      {seatByVehicle && (
        <>
          <div className="font-bold mb-1">{t("busList")}</div>
          <div>
            {seatGroup[seatByVehicle]?.map((seat, idx) => {
              let color =
                seat.seatStatusObj?.name === SEAT_STATUS.AVAILABLE ? "green" : "red";
              return <Tag key={idx} color={color}>{seat.name}</Tag>;
            })}
          </div>
        </>
      )}
    </Form>
  );
}
