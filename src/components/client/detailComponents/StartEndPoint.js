import { Tag } from "antd";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";

export default function StartEndPoint({ data }) {
  const {t} = useTranslation();
  const {dropoffObj, pickupObj} = data;
  const renderPoint = (data) => {
    return data?.map((i, idx) => {
      return <div key={idx} className='py-1'>
      <span>
        <span className="font-medium">{moment(i.time).format('HH:mm')} </span>
      </span>
      {i.shuttle && <Tag color='green'>{t("shuttle")}</Tag>}
      <span>{i.station}</span>
    </div>
  })
  }
  return (
    <div className="hover:text-black text-black mx-10 text-sm">
      <h3 className="font-medium text-lg text-alibus">{t("notice")}</h3>
      <div className="py-2">
        <p className="pb-4">{t("pickUpDropOffTxt")}</p>
      </div>
      <div className="grid grid-cols-2 px-2 py-6 max-h-96 overflow-y-auto leading-loose">
        <div className="col-span-1 px-4">
          <h3 className="font-semibold text-base">{t("pickUp")}</h3>
          <div className="py-2">
            {renderPoint(pickupObj)}
          </div>
        </div>
        <div className="col-span-1 px-4">
          <h3 className="font-semibold text-base">{t("dropOff")}</h3>
          <div className="py-2">
            {renderPoint(dropoffObj)}
          </div>
        </div>
      </div>
    </div>
  );
}
