import { Form, Input, InputNumber, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setCallbackDrawer } from "../../../redux/actions/DrawerAction";
import { Editor } from "@tinymce/tinymce-react";
import ReactQuill from "react-quill";
import { editBusCompany } from "../../../redux/actions/BusCompanyAction";
import _ from "lodash";

export default function EditBusCompanyForm() {
  const [imgSrc, setImgSrc] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { busCompanySelected } = useSelector(
    (state) => state.BusCompanyReducer
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
  const handleEditorChange = (content, editor) => {
    formik.setFieldValue("description", content);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...busCompanySelected?.review,
      id: busCompanySelected?.id,
      name: busCompanySelected?.name,
      description: busCompanySelected?.description,
      content: busCompanySelected?.content,
      address: busCompanySelected?.address,
      review: busCompanySelected?.review,
      comments: busCompanySelected.comments || 0,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, t("maxCharError", {max: 30}))
        .required(t("pleaseInputName", {title: t("company")})),
      content: Yup.string().required(t("pleaseInput", {title: t("content")})),
      address: Yup.string().required(t("pleaseInput", {title: t("address")})),
      comments: Yup.mixed().required(t("pleaseInput", {title: t("comment")})),
    }),
    onSubmit: (values) => {
      const review = {};
      _.map(values.review, function (value, key) {
        return review[key] = values[key];
      });
      values.review = JSON.stringify(review);
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
      dispatch(editBusCompany(formData));
    },
  });
  useEffect(() => {
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
            {t("company")} <span className="text-red-500">*</span>
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
          value={formik.values.address}
          onChange={formik.handleChange}
          placeholder={t("input")}
        />
        {formik.errors.address ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.address}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="my-3"
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
        label={
          <span className="font-bold capitalize">
            {t("comment")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <InputNumber
          value={formik.values.comments}
          onChange={handleChange("comments")}
        />
        {formik.errors.comments ? (
          <div className="text-red-500 text-xs mb-2">{formik.errors.comments}</div>
        ) : null}
      </Form.Item>
      {formik.values.review && _.map(formik.values.review, function (value, key) {
        return <Form.Item
        className="mb-1"
        key={key}
        label={
          <span className="font-bold capitalize">
            {key} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Slider min={0} max={10} step={0.5} value={formik.values[key]} onChange={handleChange(key)} />
      </Form.Item>
      })}
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
        {imgSrc && (
          <img
            alt="img"
            src={imgSrc}
            className="w-auto my-3"
          />
        )}
        {busCompanySelected.image && busCompanySelected.image.map((i, index) => {
          return (
            <img
              alt="img"
              key={index}
              src={i}
              width={100}
              className="m-1 inline-block"
            />
          )
        })}
      </Form.Item>
      <Form.Item
        className="mb-1 content-quill"
        label={
          <span className="font-bold capitalize">
            {t("content")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <ReactQuill
          theme="snow"
          onChange={handleChange("content")}
          value={formik.values.content}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image", "video"],
              ["clean"],
            ],
            clipboard: {
              // toggle to add extra line breaks when pasting HTML:
              matchVisual: false,
            },
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "indent",
            "link",
            "image",
            "video",
          ]}
        />
        {formik.errors.content ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.content}
          </div>
        ) : null}
      </Form.Item>
    </Form>
  );
}
