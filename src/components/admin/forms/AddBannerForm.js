import { Checkbox, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import {
  setCallbackDrawer,
  setResetCallbackDrawer,
} from "../../../redux/actions/DrawerAction";
import { addBanner } from "../../../redux/actions/GlobalAction";

export default function AddBannerForm() {
  const [imgSrc, setImgSrc] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleChangeImageSrc = async (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      await formik.setFieldValue("banner", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };
  const handleEditorChange = (content, editor) => {
    formik.setFieldValue("description", content);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      description: "",
      enable: false,
      banner: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(200, t("maxCharError", {max: 200})),
      banner: Yup.mixed().required(t("imgError")),
    }),
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "banner") {
          formData.append(key, values[key]);
        } else {
          formData.append("banner", values.banner, values.banner.name);
        }
      }
      dispatch(addBanner(formData));
    },
  });

  useEffect(() => {
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
            {t("title")}
          </span>
        }
      >
        <Input
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          placeholder={t("input")}
        />
        {formik.errors.title ? (
          <div className="text-red-500 text-xs mb-2">{formik.errors.title}</div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={<span className="font-bold capitalize">{t("desc")}</span>}
      >
        <Editor
          className="form-control"
          id="description"
          name="description"
          initialValue={formik.values.description}
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
        {formik.errors.description ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.description}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={<span className="font-bold capitalize">{t("show")}</span>}
      >
        <Checkbox
          name="enable"
          checked={formik.values.enable}
          onChange={formik.handleChange}
        />
        {formik.errors.enable ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.enable}
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
