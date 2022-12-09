import { Form, Input, Select, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import ReactQuill from "react-quill";
import * as Yup from "yup";
import { setCallbackDrawer } from "../../../redux/actions/DrawerAction";
import {
  editArticle,
  getAllHashtag,
} from "../../../redux/actions/GlobalAction";
const { Option } = Select;

export default function EditArticleForm() {
  const [imgSrc, setImgSrc] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { articleSelected, hashtagList } = useSelector(
    (state) => state.GlobalReducer
  );

  const handleChange = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleEditorChange = (content, editor) => {
    formik.setFieldValue("description", content);
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
      id: articleSelected?.id,
      title: articleSelected?.title,
      description: articleSelected?.description,
      subTitle: articleSelected?.subTitle,
      content: articleSelected?.content,
      hashtag: articleSelected?.hashtag ? articleSelected.hashtag : [],
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(200, t("maxCharError", { max: 200 }))
        .required(t("pleaseInput", { title: t("title") })),
      subTitle: Yup.string().required(
        t("pleaseInput", { title: t("subTitle") })
      ),
      content: Yup.string().required(t("pleaseInput", { title: t("content") })),
      hashtag: Yup.mixed().required(t("pleaseSelect", { title: t("card") })),
    }),
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "image") {
          formData.append(key, key === "hashtag" ? JSON.stringify(values[key]) : values[key]);
        } else {
          if (values.image !== null) {
            formData.append("image", values.image, values.image.name);
          } else {
            formData.append(key, values.image);
          }
        }
      }
      dispatch(editArticle(formData));
    },
  });

  useEffect(() => {
    dispatch(getAllHashtag());
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
            {t("title")} <span className="text-red-500">*</span>
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
        label={
          <span className="font-bold capitalize">
            {t("subTitle")}
            <span className="text-red-500">*</span>
          </span>
        }
      >
        <Input
          name="subTitle"
          onChange={formik.handleChange}
          value={formik.values.subTitle}
          placeholder={t("input")}
        />
        {formik.errors.subTitle ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.subTitle}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold capitalize">
            {t("tag")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Select
          name="hashtag"
          mode="multiple"
          allowClear
          placeholder={t("select")}
          value={formik.values.hashtag}
          onChange={handleChange("hashtag")}
        >
          {hashtagList?.map((hashtag, idx) => {
            return (
              <Option key={`tag-${idx}`} value={hashtag.id}>
                <Tag color="green">{hashtag.name}</Tag>
              </Option>
            );
          })}
        </Select>
        {formik.errors.hashtag ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.hashtag}
          </div>
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
        {(imgSrc || articleSelected.image) && (
          <img
            alt="img"
            src={imgSrc === "" ? articleSelected.image : imgSrc}
            className="w-auto my-3"
          />
        )}
      </Form.Item>
      <Form.Item
        className="mb-1 content-quill"
        label={<span className="font-bold capitalize">{t("content")}</span>}
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
