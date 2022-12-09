import { Button, Space, Steps, Tag } from "antd";
import { t } from "i18next";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import BusInfo from "../checkoutComponents/BusInfo";
import BusMap from "../checkoutComponents/BusMap";
import BusStation from "../checkoutComponents/BusStation";

const { Step } = Steps;
const StepsProgress = ({ data }) => {
  const { seatCurrent, pointCurrent, submitNextCheckout } = useSelector(
    (state) => state.CheckoutReducer
  );
  const [current, setCurrent] = useState(0);
  const { numberSeat, numberFloor, seats, point, tripObj, id, busCompanyObj } =
    data;
  const vehicledId = id;
  const tripPrice = tripObj.price;
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: t("choosePlace"),
      content: <BusMap data={{ numberFloor, numberSeat, seats }} />,
    },
    {
      title: t("pickUpDropOff"),
      content: (
        <BusStation data={point} busCompany={busCompanyObj} trip={tripObj} />
      ),
    },
    {
      title: t("enterInformation"),
      content: <BusInfo />,
    },
  ];
  const isVehicleNotSelected =
    seatCurrent.length === 0 || vehicledId !== seatCurrent[0].vehicledId;
  return (
    <div>
      <div className="border-t border-b border-alibus py-3">
        <Steps current={current} size="small">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </div>
      <div className="steps-content">{steps[current]?.content}</div>
      <div className="steps-action text-right">
        {current === 0 &&
          seatCurrent &&
          seatCurrent.length > 0 &&
          !isVehicleNotSelected && (
            <span className="float-left capitalize w-full sm:w-auto text-left pb-2 sm:pb-0">
              {t("seat")}:{" "}
              {seatCurrent?.map((i, idx) => {
                return (
                  <Tag
                    color="#008000"
                    className="text-white font-bold"
                    key={idx}
                  >
                    {i.name}
                  </Tag>
                );
              })}
            </span>
          )}
        <span>
          <Space>
            <span className="capitalize">{t("total")}: </span>
            <span className="text-alibus font-bold">
              {isVehicleNotSelected
                ? 0
                : (tripPrice * seatCurrent.length).toLocaleString()}{" "}
              đ
            </span>
            <Button
              disabled={
                (current === 0 && seatCurrent.length === 0) ||
                (current === 1 &&
                  (!pointCurrent.pickup || !pointCurrent.dropoff))
              }
              type="primary"
              className="bg-alibus disabled:bg-alibus disabled:hover:bg-alibus disabled:opacity-60 text-white rounded border-alibus hover:bg-alibus hover:text-white hover:border-alibus focus:bg-alibus focus:text-white focus:border-alibus"
              onClick={current === steps.length - 1 ? submitNextCheckout : next}
            >
              {t("next")}
            </Button>
          </Space>
        </span>
        {current > 0 && (
          <Button
            className="px-2 float-left rounded border-alibus text-alibus hover:border-alibus hover:text-alibus focus:border-alibus focus:text-alibus"
            onClick={() => prev()}
          >
              <i className="fa fa-angle-left font-medium"></i>
              <p className="pl-2 hidden sm:inline-block">{t("back")}</p>
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepsProgress;
