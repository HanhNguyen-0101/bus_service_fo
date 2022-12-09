import { Modal } from "antd";
import { t } from "i18next";
import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Prompt } from "react-router-dom";
import {
  clearPaymentCheckout,
  submitPaymentCheckout,
} from "../../../redux/actions/CheckoutAction";
import { history } from "../../../utils/history";
import { NOTIF_TYPE, openNotification } from "../../../utils/notification";
import BlockCoupon from "./BlockCoupon";
import BlockDetail from "./BlockDetail";
import BlockTrip from "./BlockTrip";
import BlockWithCardItem from "./BlockWithCardItem";
import HeaderCheckout from "./HeaderCheckout";

const useUnsavedChangesWarning = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.onbeforeunload = (e) => {
      // when reload
      dispatch(clearPaymentCheckout());
      return;
    };
    return (e) => {
      //when redirect
      dispatch(clearPaymentCheckout());
      window.onbeforeunload = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Prompt
      message={(location) => {
        t("leavePage", { pathname: location.pathname });
      }}
    />
  );
};

export default function PaymentCheckout({ time, timer }) {
  const { bookingData, paymentData } = useSelector(
    (state) => state.CheckoutReducer
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleSubmit = () => {
    if (paymentData?.paymentMethod) {
      const data = {
        point: {
          dropoff: bookingData?.pointBooking?.dropoff.id,
          pickup: bookingData?.pointBooking?.pickup.id,
        },
        identify: bookingData?.userBooking?.identify,
        name: bookingData?.userBooking?.name,
        email: bookingData?.userBooking?.email,
        numberPhone: bookingData?.userBooking?.numberPhone,
        vehicledId: bookingData?.seatBooking?.vehicle.vehicledId,
        seatSelected: bookingData?.seatBooking?.vehicle.seatList?.map(
          (i) => i.id
        ),
        paymentMethodId: paymentData?.paymentMethod,
        note: bookingData?.userBooking?.note,
      };
      data.point = JSON.stringify(data.point);
      data.seatSelected = JSON.stringify(data.seatSelected);
      dispatch(submitPaymentCheckout(data));
    } else {
      openNotification(
        NOTIF_TYPE.WARNING,
        `${t("pleaseSelect", { title: t("paymentmethod") })}!`,
        ""
      );
    }
  };
  const handleOk = () => {
    dispatch(clearPaymentCheckout());
    history.push("/");
    window.location.reload();
  };

  return (
    <div>
      {useUnsavedChangesWarning()}
      <Modal
        visible={timer === 0}
        width={800}
        footer={null}
        centered
        closable={false}
      >
        <p className="text-center text-base">
          {t("timeout", { time: 5 })}
          <button
            onClick={handleOk}
            className="pl-1 text-alibus focus-within:outline-none"
          >
            {t("reBooking")}
          </button>
        </p>
      </Modal>
      <HeaderCheckout time={time} />
      <div className="container py-10" style={{ marginTop: 80 }}>
        <div className="row">
          <div className="col-12">
            <span className="alert alert-warning p-2" role="alert">
              {t("diverse")}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-12 py-2 gap-6">
          <div className="col-span-12 sm:col-span-9">
            <h3 className="text-xl font-medium my-3 capitalize">
              {t("paymentmethod")}
            </h3>
            <BlockWithCardItem />
          </div>
          <div className="col-span-12 sm:col-span-3">
            <h3 className="text-xl font-medium my-3 capitalize">
              {t("tripDetail")}
            </h3>
            <BlockTrip />
            <h3 className="text-xl font-medium my-3 capitalize">
              {t("couponCode")}
            </h3>
            <BlockCoupon />
            <BlockDetail />
            <div className="text-center pt-14 pb-4">
              {t("clicking", { name: t("paymentSecret") })}{" "}
              <NavLink
                target="_blank"
                to="/blog/global/privacy-policy"
                className="underline text-alibus hover:text-alibus"
              >
                {t("privacy")}
              </NavLink>
            </div>
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="uppercase focus:outline-none min-w-full p-3 bg-alibusblur focus:bg-alibus focus:border-alibus border-alibusblur hover:bg-alibus hover:border-alibus font-medium text-xl fixed left-0 bottom-0"
              >
                {t("paymentSecret")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
