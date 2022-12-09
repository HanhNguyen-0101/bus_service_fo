import { Button, Input } from "antd";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NOTIF_TYPE, openNotification } from "../../../utils/notification";
import { setPaymentCheckout } from "../../../redux/actions/CheckoutAction";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export default function BlockCoupon() {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const formik = useFormik({
    initialValues: {
      coupoun: "",
    },
    validationSchema: Yup.object({
      coupoun: Yup.string().max(15, t("maxCharError", {max: 15})),
    }),
    onSubmit: (values) => {
      dispatch(setPaymentCheckout(values));
      openNotification(NOTIF_TYPE.SUCCESS, t("couponSuccess"), "");
    },
  });
  return (
    <div className="border rounded flex flex-col p-3 space-y-4 divide-y divide-gray-300">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex space-y-2 items-center justify-between">
          <Input.Group compact>
            <Input
              style={{
                width: "calc(100% - 85px)",
              }}
              className="text-gray-400"
              type="text"
              name="coupoun"
              maxLength={20}
              value={formik.values.coupoun}
              placeholder={t("coupon")}
              onChange={formik.handleChange}
            />
            <Button className="text-right underline text-sm" type="primary" htmlType="submit">
              {t("apply")}
            </Button>
          </Input.Group>
        </div>
        {formik.errors.coupoun ? (
          <div className="text-alibus text-xs py-1">{formik.errors.coupoun}</div>
        ) : null}
      </form>
    </div>
  );
}
