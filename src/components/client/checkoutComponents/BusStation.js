import { Popover, Radio, Space } from "antd";
import React from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPointCurrent } from "../../../redux/actions/CheckoutAction";
import moment from "moment";
import { useTranslation } from "react-i18next";

export default function BusStation({ data, busCompany, trip }) {
  const { dropoffObj, pickupObj } = data;
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const { pointCurrent } = useSelector((state) => state.CheckoutReducer);
  const onChange = (name) => {
    return (e) => {
      const data = {
        ...pointCurrent,
        [name]: e.target.value,
        busCompany,
        trip
      };
      dispatch(setPointCurrent(data));
    };
  };
  const renderStation = (data) => {
    return data?.map((i, idx) => {
      return (
        <Radio value={JSON.stringify(i)} key={idx} className="text-base">
          <span>
            <span className="font-bold capitalize">{moment(i.time).format('HH:mm')} </span>
          </span>
          <span>{i.station}</span>
          <div className="flex justify-center items-center py-2">
            <EnvironmentOutlined />
            <p className="text-sm px-2">
              {i.address}{" "}
              <NavLink to={i.position} target='_blank' className="underline text-alibus hover:text-alibus">
                {t("viewMap")}
              </NavLink>
            </p>
          </div>
        </Radio>
      );
    });
  };
  return (
    <div>
      <span className="alert alert-warning py-2 px-3 text-xs sm:text-sm" role="alert">
        {t("pickUpDropOffTxt1")}
      </span>
      <div className="mt-6 mx-auto grid grid-cols-1 sm:grid-cols-2 text-base">
        <div className="col-span-1 py-2 sm:py-6 sm:px-6 sm:border-r">
          <h6 className="text-lg py-6 rounded px-3 bg-gray-100 font-bold mb-4">
            {t("pickUp")}
          </h6>
          <Radio.Group
            onChange={onChange("pickup")}
            value={pointCurrent.pickup}
          >
            <Space direction="vertical" className="max-h-96 overflow-y-auto">
              {renderStation(pickupObj)}
            </Space>
          </Radio.Group>
        </div>
        <div className="col-span-1 py-2 sm:py-6 sm:px-6">
          <h6 className="text-lg py-6 rounded px-3 bg-gray-100 font-bold mb-4">
          {t("dropOff")}
          </h6>
          <Radio.Group
            onChange={onChange("dropoff")}
            value={pointCurrent.dropoff}
          >
            <Space direction="vertical" className="max-h-96 overflow-y-auto">
              {renderStation(dropoffObj)}
            </Space>
          </Radio.Group>
        </div>
      </div>
      <div className="mt-6 text-right">
        <Popover
          placement="topRight"
          content={
            <div>
              Hotline -{' '}
              <a href="tel:1900888684">
                <span className="text-alibus hover:text-alibus">
                  1900868024
                </span>
              </a>
            </div>
          }
          trigger="click"
        >
          <span className="font-bold text-alibus cursor-pointer focus:text-alibus">
            <i className="fa fa-exclamation-circle"></i> {t("reportProblem")}
          </span>
        </Popover>
      </div>
    </div>
  );
}
