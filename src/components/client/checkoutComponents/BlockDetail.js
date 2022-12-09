import { Tag } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function BlockDetail() {
  const { bookingData } = useSelector((state) => state.CheckoutReducer);
  const { seatBooking, pointBooking } = bookingData;
  const { t } = useTranslation();
  return (
    <div>
      <div className="mt-3">
        <h3 className="text-xl font-medium my-3 inline capitalize">{t("total")}</h3>
        <span className="text-xl float-right text-alibus font-bold">
          {(
            pointBooking.trip?.price * seatBooking?.vehicle.seatList.length
          ).toLocaleString()}{" "}
          đ
        </span>
      </div>
      <div className="text-right">
        <span className="underline">
          <a
            data-toggle="collapse"
            href="#collapseDetail"
            role="button"
            aria-expanded="false"
            aria-controls="collapseDetail"
            className="hover:text-alibus"
          >
            {t("seeMore")}
          </a>
        </span>
        <div className="collapse mt-2 text-left" id="collapseDetail">
          <div className="border rounded flex flex-col p-3 space-y-4 divide-y divide-gray-300">
            <div className="flex flex-col space-y-2">
              <div>
                <div className="flex items-start justify-between text-xs">
                  <h3 className="text-gray-400 py-1">{t("fare")}</h3>
                </div>
                <div>
                  {(pointBooking.trip?.price).toLocaleString()} đ x{" "}
                  {seatBooking?.vehicle.seatList.length}
                </div>
                <div>
                  {t("seats")}:{" "}
                  {seatBooking?.vehicle.seatList?.map((i, idx) => (
                    <Tag color="#008000" key={idx} className="font-medium m-1">
                      {i.name}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-3 space-y-2">
              <div>
                <div className="flex items-start justify-between text-xs">
                  <h3 className="text-gray-400 py-1 capitalize">{t("total")}</h3>
                </div>
                <div>
                  {(
                    pointBooking.trip?.price *
                    seatBooking?.vehicle.seatList.length
                  ).toLocaleString()}{" "}
                  đ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
