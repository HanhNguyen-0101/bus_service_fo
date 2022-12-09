import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setCallbackDrawer,
  setResetCallbackDrawer,
} from "../../../redux/actions/DrawerAction";
import { addStation } from "../../../redux/actions/StationAction";
import { getAllProvince } from "../../../redux/actions/GlobalAction";

const { Option, OptGroup } = Select;

export default function AddStationForm() {
  const [imgSrc, setImgSrc] = useState("");
  const { t } = useTranslation();
  const { provinceList } = useSelector((state) => state.GlobalReducer);
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
      provinceId: "",
      name: "",
      address: "",
      image: "",
    },
    validationSchema: Yup.object({
      provinceId: Yup.mixed().required(t("pleaseSelect", {title: t("city")})),
      name: Yup.string()
        .max(30, t("maxCharError", {max: 30}))
        .required(t("pleaseInputName", {title: t("company")})),
      address: Yup.string()
        .max(150, t("maxCharError", {max: 150}))
        .required(t("pleaseInput", {title: t("address")})),
      image: Yup.mixed().required(t("imgError")),
    }),
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "image") {
          formData.append(key, values[key]);
        } else {
          formData.append("image", values.image, values.image.name);
        }
      }
      dispatch(addStation(formData));
    },
  });

  useEffect(() => {
    dispatch(getAllProvince());
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
            {t("name", {title: t("place")})} <span className="text-red-500">*</span>
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
            {t("address")} <span className="text-red-500">*</span>
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
            {t("city")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Select
          onChange={handleChange("provinceId")}
          name="provinceId"
          value={formik.values.provinceId}
        >
          <OptGroup label="States - Cities">
            {provinceList?.map((province, idx) => {
              return (
                <Option key={`city-${idx}`} value={province.id}>
                  {province.name}
                </Option>
              );
            })}
          </OptGroup>
        </Select>
        {formik.errors.provinceId ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.provinceId}
          </div>
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
