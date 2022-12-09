import { Form, Input } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setCallbackDrawer } from "../../../redux/actions/DrawerAction";
import { Editor } from "@tinymce/tinymce-react";
import { editPaymentMethod } from "../../../redux/actions/GlobalAction";
import { useState } from "react";

export default function EditPaymentMethodForm() {
  const { t } = useTranslation();
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const { paymentMethodSelected } = useSelector((state) => state.GlobalReducer);
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
      id: paymentMethodSelected?.id,
      name: paymentMethodSelected?.name,
      logo: paymentMethodSelected?.logo,
      subTitle: paymentMethodSelected?.subTitle,
      promo: paymentMethodSelected?.promo,
      conditionLink: paymentMethodSelected?.conditionLink,
      paymentIntro: paymentMethodSelected?.paymentIntro,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(
        t("pleaseInputName", { title: t("paymentmethod") })
      ),
    }),
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "logo") {
          formData.append(key, values[key]);
        } else {
          if (typeof values.logo !== "string") {
            formData.append("logo", values.logo, values.logo.name);
          } else {
            formData.append(key, values.logo);
          }
        }
      }
      dispatch(editPaymentMethod(formData));
    },
  });

  useEffect(() => {
    dispatch(setCallbackDrawer(formik.handleSubmit));
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
        {(imgSrc || paymentMethodSelected.logo) && (
          <img
            alt="img"
            src={imgSrc === "" ? paymentMethodSelected.logo : imgSrc}
            className="w-auto my-3"
          />
        )}
      </Form.Item>
    </Form>
  );
}
