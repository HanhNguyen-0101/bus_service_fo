import React from "react";
import { useSelector } from "react-redux";
import Header from "../globals/Header";
import { SketchOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PaymentSuccess() {
  const {t} = useTranslation();
  const { paymentSuccess } = useSelector((state) => state.CheckoutReducer);
  return (
    <>
      <Header />
      <div className="container py-10">
        <section className="flex items-center h-full sm:p-16 dark:bg-gray-900 dark:text-gray-100">
          <div className="container flex flex-col items-center justify-center sm:px-5 mx-auto my-8">
            <div className="text-center">
              <h2 className="mb-8 font-extrabold text-9xl text-alibus">
                <SketchOutlined />
              </h2>
              <p className="text-lg sm:text-2xl font-semibold md:text-3xl">
                {t("congratulations")}{" "}
                <span className="text-alibus">{paymentSuccess.name}</span> {t("booked")}{" "}
                <span className="text-alibus">{paymentSuccess.id}</span>
              </p>
              <p className="mt-4 text-sm text-gray-400 mb-20">
                {t("happyTrip", {name: paymentSuccess.name})}
              </p>
              <NavLink
                to="/"
                className="px-8 py-3 font-semibold rounded bg-alibus text-white hover:text-white"
              >
                {t("backHomepage")}
              </NavLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
