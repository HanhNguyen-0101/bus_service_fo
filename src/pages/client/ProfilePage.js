import { Avatar, Button, Form, Input, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { history } from "../../utils/history";
import { updateProfile } from "../../redux/actions/UserAction";
import { filterTickByEmail } from "../../redux/actions/TicketAction";
import moment from "moment";
import { ORDER_STATUS, PAYMENT_STATUS } from "../../utils/constant";
import _ from "lodash";

export default function ProfilePage() {
  const { userLogin } = useSelector((state) => state.UserReducer);
  const { ticketOfUser } = useSelector((state) => state.TicketReducer);
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState("");
  const { t } = useTranslation();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: userLogin?.id,
      password: userLogin?.password,
      email: userLogin?.email,
      numberPhone: userLogin?.numberPhone,
      typeId: userLogin?.typeId,
      name: userLogin?.name,
      avatar: null,
    },
    validationSchema: Yup.object({
      password: Yup.string().required(
        t("pleaseInput", { title: t("password") })
      ),
      typeId: Yup.mixed().required(
        t("pleaseInput", { title: t("type", { title: t("member") }) })
      ),
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
    }),
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key === "avatar" && values.avatar !== null) {
          formData.append("avatar", values.avatar, values.avatar.name);
        } else {
          formData.append(key, values[key]);
        }
      }
      dispatch(updateProfile(formData));
    },
  });
  useEffect(() => {
    dispatch(filterTickByEmail(userLogin.email));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (userLogin.name) {
    const { name, email, numberPhone, avatar } = userLogin;
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
    const renderTicketHistory = () => {
      return _.orderBy(ticketOfUser, ["id"], ["desc"])?.map((ticket, idx) => {
        const {
          id,
          pointObj,
          identify,
          name,
          numberPhone,
          note,
          paymentMethodObj,
          orderStatusObj,
          paymentStatusObj,
          seatSelectedObj,
          vehicledObj,
          createdAt,
        } = ticket;
        let color = "cyan";
        if (orderStatusObj.name === ORDER_STATUS.IGNORE) {
          color = "red";
        }
        if (orderStatusObj.name === ORDER_STATUS.SUCCESS) {
          color = "green";
        }
        return (
          <li
            key={idx}
            className="my-2 rounded-md border shadow-md hover:bg-alibusblurv w-full"
          >
            <article className="p-4 overflow-hidden rounded-xl lg:p-6 hover:dark:bg-gray-900">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <time className="pt-1 italic text-gray-400">
                  ID#{id} {moment(createdAt).format("MMM DD, YYYY")}
                </time>
                <div className="mb-1 text-right">
                  <span className="italic capitalize">
                    {t("ticketStatus")}:{" "}
                  </span>
                  <Tag color={color} className="uppercase">
                    {orderStatusObj.name}
                  </Tag>
                </div>
              </div>
              <div className="my-2">
                <h3 className="text-alibus font-semibold text-lg">
                  {`${vehicledObj.tripObj.fromStationObj.name} - ${vehicledObj.tripObj.toStationObj.name}`}
                </h3>
                <p className="mb-2 text-gray-400">
                  {vehicledObj.tripObj.tripAt
                    ? moment(vehicledObj.tripObj.tripAt).format(
                        "MMM DD, YYYY - hh:mm A"
                      )
                    : ""}{" "}
                  ({t("minute", { time: vehicledObj.tripObj.startTime })})
                </p>

                <p className="ml-8 mt-2 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-10 md:ml-0">
                  <p className="uppercase font-medium text-sm text-black py-1.5">
                    {t("info", { title: t("user") })}
                  </p>
                  <hr />
                  <div className="py-1 capitalize">
                    <div className="py-1">
                      <span>{t("fullname")} : </span>
                      <span className="font-medium text-alibus">{name}</span>
                    </div>
                    <div className="py-1">
                      <span>{t("identifyId")} : </span>
                      <span className="font-medium">{identify}</span>
                    </div>
                    <div className="py-1">
                      <span>{t("phone")} : </span>
                      <span className="font-medium">{numberPhone}</span>
                    </div>
                  </div>
                  <p className="uppercase font-medium text-sm text-black py-1.5">
                    {t("info", { title: t("ticket") })}
                  </p>
                  <hr />
                  <div className="py-1 capitalize">
                    <div className="py-1">
                      <span>{t("bus")} : </span>
                      <span className="font-medium">{vehicledObj.name}</span>
                    </div>
                    <div className="py-1">
                      <span>{t("company")} : </span>
                      <span className="font-medium text-alibus">
                        {vehicledObj.busCompanyObj.name}
                      </span>
                    </div>
                    <div className="py-1">
                      <span>{t("row")} : </span>
                      <span className="font-medium">
                        {seatSelectedObj?.map((i, idx) => {
                          return (
                            <Tag
                              key={idx}
                              color="#f47920"
                              className="text-white font-medium m-1"
                            >
                              {i.name}
                            </Tag>
                          );
                        })}
                      </span>
                    </div>
                    {pointObj &&
                      _.map(pointObj, function (value, key) {
                        return (
                          <div className="py-1" key={key}>
                            <span>{t(key)} : </span>
                            <span>
                              <span className="font-medium">
                                {value.station}
                              </span>{" "}
                              - {value.address}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                  <p className="uppercase font-medium text-sm text-black py-1.5">
                    {t("info", { title: t("pay") })}
                  </p>
                  <hr />
                  <div className="py-1 capitalize">
                    <div className="py-1">
                      <span>{t("paymentmethod")} : </span>
                      <span className="text-alibus font-medium">
                        {paymentMethodObj.name}
                      </span>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: note }} />
                    <div className="py-1">
                      <span>{`${t("status")} ${t("pay")}`}: </span>
                      <Tag
                        className="uppercase"
                        color={
                          paymentStatusObj.name === PAYMENT_STATUS.DONE
                            ? "green"
                            : "orange"
                        }
                      >
                        {paymentStatusObj.name}
                      </Tag>
                    </div>
                  </div>
                </p>
              </div>
            </article>
          </li>
        );
      });
    };
    return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                  <Avatar src={avatar} size={150} />
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                    {name}
                  </h2>
                  <div className="w-12 h-1 bg-alibus rounded mt-2 mb-4" />
                  <p className="text-base italic">
                    <span className="capitalize">{t("email")}</span>: {email}
                  </p>
                  <p className="text-base italic capitalize">
                    {t("phone")}: {numberPhone}
                  </p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 py-4 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 sm:mt-0 text-left">
                <Form
                  labelCol={{
                    span: 5,
                  }}
                  layout="horizontal"
                  size="default"
                  labelAlign="left"
                  colon={false}
                  className="leading-relaxed text-lg mb-4"
                  onSubmitCapture={formik.handleSubmit}
                  autoComplete="off"
                >
                  <Form.Item
                    className="mb-1"
                    label={
                      <span className="font-bold capitalize">
                        {t("account")}
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
                      <div className="text-red-500 text-xs mb-2">
                        {formik.errors.name}
                      </div>
                    ) : null}
                  </Form.Item>
                  <Form.Item
                    className="mb-1"
                    label={
                      <span className="font-bold capitalize">
                        {t("password")}
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
                    label={
                      <span className="font-bold capitalize">{t("email")}</span>
                    }
                  >
                    <Input
                      name="email"
                      disabled
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      placeholder={t("input")}
                    />
                    {formik.errors.email ? (
                      <div className="text-red-500 text-xs mb-2">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </Form.Item>
                  <Form.Item
                    className="mb-1"
                    label={
                      <span className="font-bold capitalize">{t("phone")}</span>
                    }
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
                      <span className="font-bold capitalize">{t("image")}</span>
                    }
                  >
                    <input
                      type="file"
                      onChange={handleChangeImageSrc}
                      accept="image/png, image/jpeg,image/gif,image/png"
                    />
                    {imgSrc && (
                      <Avatar
                        shape="square"
                        src={imgSrc}
                        className="my-3"
                        size={100}
                      />
                    )}
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      offset: 5,
                    }}
                  >
                    <Button
                      htmlType="submit"
                      type="primary"
                      className="w-full capitalize"
                    >
                      {t("save")}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
            {ticketOfUser && ticketOfUser.length && (
              <div className="text-gray-600 body-font py-24">
                <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                    {t("history")}
                  </h1>
                  <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
                    {t("subHistory")}
                  </p>
                </div>
                <ul className="flex flex-wrap justify-center">
                  {renderTicketHistory()}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  } else {
    history.push("/");
    window.location.reload();
  }
}
