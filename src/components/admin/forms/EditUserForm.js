import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { editUser } from "../../../redux/actions/UserAction";
import { setCallbackDrawer } from "../../../redux/actions/DrawerAction";
import { getAllUserType } from "../../../redux/actions/GlobalAction";

const { Option, OptGroup } = Select;

export default function EditUserForm() {
  const [imgSrc, setImgSrc] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userSelected } = useSelector((state) => state.UserReducer);
  const { userTypeList } = useSelector((state) => state.GlobalReducer);
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
      await formik.setFieldValue("avatar", file);
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
      id: userSelected?.id,
      password: userSelected?.password,
      email: userSelected?.email,
      numberPhone: userSelected?.numberPhone,
      typeId: userSelected?.typeId,
      name: userSelected?.name,
    },
    validationSchema: Yup.object({
      password: Yup.string().required(t("pleaseInput", {title: t("password")})),
      typeId: Yup.mixed().required(t("pleaseInput", {title: t("type", {title: t("member")})})),
      name: Yup.string().max(30, t("maxCharError", {max: 30})).required(t("pleaseInput", {title: t("account")})),
      email: Yup.string().email(t("pleaseInput", {title: t("email")})).required(t("pleaseInput", {title: t("email")})),
      numberPhone: Yup.string().required(t("pleaseInput", {title: t("phone")})).matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        t("pleaseInput", {title: t("phone")})
      ),
    }),
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "avatar") {
          formData.append(key, values[key]);
        } else {
          if (values.avatar !== null) {
            formData.append("avatar", values.avatar, values.avatar.name);
          } else {
            formData.append(key, values.logo);
          }
        }
      }
      dispatch(editUser(formData));
    },
  });

  useEffect(() => {
    dispatch(getAllUserType());
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
            {t("account")} <span className="text-red-500">*</span>
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
            {t("type", {title: t("member")})} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Select
          onChange={handleChange("typeId")}
          name="typeId"
          value={formik.values.typeId}
        >
          <OptGroup label="User Type">
            {userTypeList?.map((type, idx) => {
              return (
                <Option key={idx} value={type.id}>
                  {type.name.toUpperCase()}
                </Option>
              );
            })}
          </OptGroup>
        </Select>
        {formik.errors.typeId ? (
          <div className="text-red-500 text-xs mb-2">{formik.errors.typeId}</div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("password")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Input.Password
          name="password"
          placeholder={t("input")}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.password}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={<span className="font-bold capitalize">{t("email")} <span className="text-red-500">*</span></span>}
      >
        <Input
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder={t("input")}
        />
        {formik.errors.email ? (
          <div className="text-red-500 text-xs mb-2">{formik.errors.email}</div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={<span className="font-bold capitalize">{t("phone")} <span className="text-red-500">*</span></span>}
      >
        <Input
          name="numberPhone"
          onChange={formik.handleChange}
          value={formik.values.numberPhone}
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
            {t("image")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <input
          type="file"
          onChange={handleChangeImageSrc}
          accept="image/png, image/jpeg,image/gif,image/png"
        />
        {(imgSrc || userSelected.avatar) && (
          <img
            alt="img"
            src={imgSrc === "" ? userSelected.avatar : imgSrc}
            className="w-auto my-3"
          />
        )}
      </Form.Item>
    </Form>
  );
}
