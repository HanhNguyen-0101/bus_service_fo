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
import { Editor } from "@tinymce/tinymce-react";
import { addPaymentMethod } from "../../../redux/actions/GlobalAction";
import { useState } from "react";

export default function AddPaymentMethodForm() {
  const { t } = useTranslation();
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();

  const handleChangeImageSrc = async (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      await formik.setFieldValue("logo", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };
  const handleEditorChange = (content, editor) => {
    formik.setFieldValue(editor.id, content);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      logo: "",
      subTitle: "",
      promo: "",
      conditionLink: "#",
      paymentIntro: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(
        t("pleaseInputName", { title: t("paymentmethod") })
      ),
      logo: Yup.mixed().required(t("imgError")),
    }),
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "logo") {
          formData.append(key, values[key]);
        } else {
          formData.append("logo", values.logo, values.logo.name);
        }
      }
      dispatch(addPaymentMethod(formData));
    },
  });

  useEffect(() => {
    dispatch(setCallbackDrawer(formik.handleSubmit));
    dispatch(setResetCallbackDrawer(formik.handleReset));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      layout="vertical"
      size="default"
      labelAlign="left"
      colon={false}
      className="px-4"
      onSubmitCapture={formik.handleSubmit}
    >
      <Form.Item
        className="py-1 mb-1"
        label={
          <span className="font-bold capitalize">
            {t("name", {title: t("paymentmethod")})}<span className="text-red-500">*</span>
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
        className="py-1 mb-1"
        label={<span className="font-bold capitalize">{t("desc")}</span>}
      >
        <Editor
          className="form-control"
          id="subTitle"
          name="subTitle"
          initialValue={formik.values.subTitle}
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
        {formik.errors.subTitle ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.subTitle}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="py-1 mb-1"
        label={<span className="font-bold capitalize">{t("promo")}</span>}
      >
        <Editor
          className="form-control"
          id="promo"
          name="promo"
          initialValue={formik.values.promo}
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
        {formik.errors.promo ? (
          <div className="text-red-500 text-xs mb-2">{formik.errors.promo}</div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="py-1 mb-1"
        label={<span className="font-bold capitalize">{t("introUseURL")}</span>}
      >
        <Input
          name="conditionLink"
          onChange={formik.handleChange}
          value={formik.values.conditionLink}
          placeholder={t("input")}
        />
        {formik.errors.conditionLink ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.conditionLink}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="py-1 mb-1"
        label={<span className="font-bold capitalize">{t("intropayment")}</span>}
      >
        <Editor
          className="form-control"
          id="paymentIntro"
          name="paymentIntro"
          initialValue={formik.values.paymentIntro}
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
        {formik.errors.paymentIntro ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.paymentIntro}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="py-1 mb-1"
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
        {formik.errors.banner ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.banner}
          </div>
        ) : null}
        {imgSrc && <img alt="img" src={imgSrc} className="w-auto my-3" />}
      </Form.Item>
    </Form>
  );
}
