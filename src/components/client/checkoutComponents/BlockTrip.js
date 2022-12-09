import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function BlockTrip() {
  const { bookingData } = useSelector((state) => state.CheckoutReducer);
  const { seatBooking, pointBooking, userBooking } = bookingData;
  const {t} = useTranslation();
  return (
    <div className="border rounded flex flex-col p-3 space-y-4 divide-y divide-gray-300">
      <div className="flex flex-col space-y-2">
        <div>
          <div className="flex items-start justify-between text-xs">
            <h3 className="text-gray-400 py-1 capitalize">{t("passenger")}</h3>
          </div>
          <div>{userBooking?.name}</div>
        </div>
        <div>
          <div className="flex items-start justify-between text-xs">
            <h3 className="text-gray-400 py-1 capitalize">{t("phone")}</h3>
          </div>
          <div>{userBooking?.numberPhone}</div>
        </div>
        <div>
          <div className="flex items-start justify-between text-xs">
            <h3 className="text-gray-400 py-1 capitalize">{t("email")}</h3>
          </div>
          <div>{userBooking?.email}</div>
        </div>
        <div>
          <div className="flex items-start justify-between text-xs">
            <h3 className="text-gray-400 py-1">{t("identifyId")}</h3>
          </div>
          <div>{userBooking?.identify}</div>
        </div>
        <div>
          <div className="flex items-start justify-between text-xs">
            <h3 className="text-gray-400 py-1 capitalize">{t("note")}</h3>
          </div>
          <div>{userBooking?.note}</div>
        </div>
      </div>
      <div className="pt-3 space-y-2">
        <div>
          <div className="flex items-start justify-between text-xs">
            <h3 className="text-gray-400 py-1">{t("busOperator")}</h3>
          </div>
          <div>{seatBooking?.busCompany.name}</div>
        </div>
        <div>
          <div className="flex items-start justify-between text-xs">
            <h3 className="text-gray-400 py-1">{t("pickUpEst")}</h3>
          </div>
          <div>
            {pointBooking.pickup
              ? moment(pointBooking.pickup.time).format("HH:mm")
              : ""}{" "}
            - {moment(pointBooking?.trip.tripAt).format("DD/MM/YYYY")}
          </div>
          <div>{pointBooking.pickup ? pointBooking.pickup.station : ""}</div>
        </div>
        <div>
          <div className="flex items-start justify-between text-xs">
            <h3 className="text-gray-400 py-1">{t("dropOffEst")}</h3>
          </div>
          <div>
            {pointBooking.dropoff
              ? moment(pointBooking.dropoff.time).format("HH:mm")
              : ""}{" "}
            - {moment(pointBooking?.trip.tripAt).format("DD/MM/YYYY")}
          </div>
          <div>{pointBooking.dropoff ? pointBooking.dropoff.station : ""}</div>
        </div>
      </div>
    </div>
  );
}
