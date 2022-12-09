import { Form, Input, Select, Space, Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import {
  setCallbackDrawer,
  setResetCallbackDrawer,
} from "../../../redux/actions/DrawerAction";
import { addTicket } from "../../../redux/actions/TicketAction";
import { getAllSeat } from "../../../redux/actions/SeatAction";
import { getAllVehicle } from "../../../redux/actions/VehicleAction";
import { useState } from "react";
import {
  ORDER_STATUS, PAYMENT_STATUS,
} from "../../../utils/constant";
import { getAllOrderStatus, getAllPaymentMethod, getAllPaymentStatus, getAllPoint } from "../../../redux/actions/GlobalAction";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { groupSeatByVehicle } from "../../../models/SeatModel";
import { Point } from "../../../models/VehicleModel";

const { Option, OptGroup } = Select;

export default function AddTicketForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { seatList } = useSelector((state) => state.SeatReducer);
  const { vehicleList } = useSelector((state) => state.VehicleReducer);
  const { paymentMethodList, pointList, paymentStatusList, orderStatusList } =
    useSelector((state) => state.GlobalReducer);
  const [seatByVehicle, setSeatByVehicle] = useState(0);
  const seatGroup = groupSeatByVehicle(seatList);
  const handleChange = (name) => {
    return (value) => {
      if (name === "vehicledId") {
        setSeatByVehicle(value);
        formik.setFieldValue("seatSelected", []);
      }
      formik.setFieldValue(name, value);
    };
  };
  const handleEditorChange = (content, editor) => {
    formik.setFieldValue(editor.id, content);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      identify: "",
      name: "",
      email: "",
      numberPhone: "",
      seatSelected: null,
      vehicledId: null,
      orderStatusId: null,
      paymentStatusId: null,
      paymentMethodId: null,
      note: "",
      point: new Point(),
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, t("maxCharError", { max: 30 }))
        .required(t("pleaseInput", { title: t("account") })),
      email: Yup.string()
        .email(t("pleaseInput", { title: t("email") }))
        .required(t("pleaseInput", { title: t("email") })),
      numberPhone: Yup.string().matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        t("pleaseInput", { title: t("phone") })
      ),
      identify: Yup.string()
        .min(9, t("minCharError", { min: 9 }))
        .max(11, t("maxCharError", { max: 11 }))
        .required(t("pleaseInputIdentify")),
      seatSelected: Yup.mixed().required(
        t("pleaseSelectList", { title: t("seat") })
      ),
      vehicledId: Yup.mixed().required(t("pleaseSelect", { title: t("bus") })),
      orderStatusId: Yup.mixed().required(
        t("pleaseSelect", { title: t("orderStatus", { title: t("ticket") }) })
      ),
      paymentStatusId: Yup.mixed().required(
        t("pleaseSelect", { title: t("paymentStatus", { title: t("ticket") }) })
      ),
      paymentMethodId: Yup.mixed().required(
        t("pleaseSelect", { title: t("paymentmethod") })
      ),
    }),
    onSubmit: (values) => {
      const point = {};
      _.map(values.point, function (value, key) {
        return point[key] = values[key];
      });
      values.point = JSON.stringify(point);
      values.seatSelected = JSON.stringify(values.seatSelected);
      dispatch(addTicket(values));
    },
  });

  useEffect(() => {
    dispatch(getAllPaymentMethod());
    dispatch(getAllVehicle());
    dispatch(getAllOrderStatus());
    dispatch(getAllPaymentStatus());
    dispatch(getAllSeat());
    dispatch(getAllPoint());
    dispatch(setCallbackDrawer(formik.handleSubmit));
    dispatch(setResetCallbackDrawer(formik.handleReset));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      labelCol={{
        span: 7,
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
            {t("orderStatus")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Select
          onChange={handleChange("orderStatusId")}
          name="orderStatusId"
        >
          {orderStatusList?.map((s, idx) => {
            let color = "cyan";
            if (s.name === ORDER_STATUS.IGNORE) {
              color = "red";
            }
            if (s.name === ORDER_STATUS.SUCCESS) {
              color = "green";
            }
            return (
              <Option key={idx} value={s.id}>
                <Tag className="font-medium uppercase" color={color}>
                  {s.name}
                </Tag>
              </Option>
            );
          })}
        </Select>
        {formik.errors.orderStatusId ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.orderStatusId}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("fullname")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Input
          name="name"
          onChange={formik.handleChange}
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
            {t("email")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Input
          name="email"
          onChange={formik.handleChange}
          placeholder={t("input")}
        />
        {formik.errors.email ? (
          <div className="text-red-500 text-xs mb-2">{formik.errors.email}</div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("phone")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Input
          name="numberPhone"
          onChange={formik.handleChange}
          placeholder={t("input")}
        />
        {formik.errors.numberPhone ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.numberPhone}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("identifyId")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Input
          placeholder={t("input")}
          name="identify"
          onChange={formik.handleChange}
        />
        {formik.errors.identify ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.identify}
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
        >
          <OptGroup label={t("bus")}>
            {vehicleList?.map((vehicle, idx) => {
              return (
                <Option key={idx} value={vehicle.id}>
                  {`${vehicle.name} - ${vehicle.busCompanyObj.name}`}
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
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("busList")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Select
          onChange={handleChange("seatSelected")}
          name="seatSelected"
          mode="multiple"
        >
          <OptGroup label={t("busList")}>
            {seatByVehicle && seatGroup[seatByVehicle]?.map(
              (seat, idx) => {
                return (
                  <Option key={idx} value={seat.id}>
                    <Tag className="font-medium" color="green">
                      {seat.name}
                    </Tag>
                  </Option>
                );
              }
            )}
          </OptGroup>
        </Select>
        {formik.errors.seatSelected ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.seatSelected}
          </div>
        ) : null}
      </Form.Item>
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
                placeholder={t("select")}
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
        label={
          <span className="font-bold capitalize">
            {t("paymentmethod")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Select
          onChange={handleChange("paymentMethodId")}
          name="paymentMethodId"
        >
          <OptGroup label={t("paymentmethod")}>
            {paymentMethodList?.map((payment, idx) => {
              return (
                <Option key={idx} value={payment.id}>
                  {payment.name}
                </Option>
              );
            })}
          </OptGroup>
        </Select>
        {formik.errors.paymentMethodId ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.paymentMethodId}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("paymentStatus")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Select
          onChange={handleChange("paymentStatusId")}
          name="paymentStatusId"
        >
          {paymentStatusList?.map((s, idx) => {
            let color = "cyan";
            if (s.name === PAYMENT_STATUS.NOT_YET) {
              color = "red";
            }
            return (
              <Option key={idx} value={s.id}>
                <Tag className="font-medium uppercase" color={color}>
                  {s.name}
                </Tag>
              </Option>
            );
          })}
        </Select>
        {formik.errors.paymentStatusId ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.paymentStatusId}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("note", { title: "" })}
          </span>
        }
      >
        <Editor
          className="form-control"
          id="note"
          name="note"
          init={{
            height: 200,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={handleEditorChange}
        />
        {formik.errors.note ? (
          <div className="text-red-500 text-xs mb-2">{formik.errors.note}</div>
        ) : null}
      </Form.Item>
    </Form>
  );
}
