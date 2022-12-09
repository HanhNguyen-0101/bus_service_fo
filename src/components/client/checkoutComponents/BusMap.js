import { Space } from "antd";
import _ from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getFromToOfArray } from "../../../models/GlobalModel";
import { setSeatCurrent } from "../../../redux/actions/CheckoutAction";
import { SEAT_STATUS } from "../../../utils/constant";

const SeatDisabled = () => {
  return (
    <span className="seat seat-disabled inline-flex flex-row justify-center items-end pb-1">
      <i className="fa fa-car"></i>
    </span>
  );
};
const SeatSelected = () => {
  return (
    <span className="seat seat-selected inline-flex flex-col justify-center items-center">
      <i className="fa fa-check pb-1"></i>
      <i className="fa fa-car"></i>
    </span>
  );
};
const SeatAvailabled = () => {
  return (
    <span className="seat seat-availabled inline-flex flex-col justify-center items-center">
      <i className="fa fa-times pb-1"></i>
      <i className="fa fa-car"></i>
    </span>
  );
};
export default function BusMap({ data }) {
  const { numberFloor, numberSeat, seats } = data;
  const { seatCurrent } = useSelector((state) => state.CheckoutReducer);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const seatOneFloor = numberSeat / numberFloor;
  const seatData = _.orderBy(seats, ["name"], ["asc"]);
  const firstFloor = getFromToOfArray([...seatData], 0, seatOneFloor);
  const secondFloor = getFromToOfArray(
    [...seatData],
    seatOneFloor,
    seats.length
  );

  const handleSelected = (seat) => {
    let result = [];
    if (
      seatCurrent &&
      seatCurrent.length &&
      seatCurrent[0].vehicledId !== seat.vehicledId
    ) {
      result.push(seat);
    } else {
      const index = seatCurrent?.findIndex((i) => i.id === seat.id);
      result = [...seatCurrent];
      if (index !== -1) {
        result.splice(index, 1);
      } else {
        result.push(seat);
      }
    }
    dispatch(setSeatCurrent(result));
  };

  const renderSeat = (arr) => {
    return arr?.map((s, idx) => {
      if (s.seatStatusObj.name === SEAT_STATUS.BOOKED) {
        return (
          <button
            key={idx}
            disabled
            className="col-span-1 text-center focus:outline-none"
          >
            <SeatAvailabled />
          </button>
        );
      } else {
        const index = seatCurrent?.findIndex((i) => i.id === s.id);
        return (
          <button
            key={idx}
            onClick={() => handleSelected(s)}
            className="col-span-1 text-center focus:outline-none"
          >
            {index !== -1 ? <SeatSelected /> : <SeatDisabled />}
          </button>
        );
      }
    });
  };

  return (
    <div>
      <span className="alert alert-warning py-2 px-3 text-xs sm:text-sm" role="alert">
        {t("choosePlaceTxt1")}
      </span>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2">
        <div className="col-span-1 sm:px-10 leading-loose">
          <h6 className="text-base font-medium">{t("note")}</h6>
          <div className="mb-6">
            <div className="flex items-center mb-1 mt-3 sm:mt-3 sm:mb-3">
              <Space>
                <SeatDisabled />
                <span>{t("available")}</span>
              </Space>
            </div>
            <div className="flex items-center mb-1 sm:mt-3 sm:mb-3">
              <Space>
                <SeatAvailabled />
                <span>{t("notAvailble")}</span>
              </Space>
            </div>
            <div className="flex items-center mb-1 sm:mt-3 sm:mb-3">
              <Space>
                <SeatSelected />
                <span>{t("selected")}</span>
              </Space>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-2 justify-center gap-y-2 gap-x-10">
            <div className="col-span-1">
              <h6 className="text-base font-medium mb-4 text-center">{t("downstair")}</h6>
              <div className="bg-alibusblurv rounded-t-3xl border-alibusblurv py-6 px-2 w-20 m-auto">
                <div className="grid grid-cols-2 justify-center items-center gap-y-3">
                  <div className="col-span-1 text-center">
                    <svg
                      width="24"
                      height="24"
                      style={{ margin: 4 }}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.305 24h-.61c-.035-.004-.07-.01-.105-.012a11.783 11.783 0 0 1-2.117-.261 12.027 12.027 0 0 1-6.958-4.394A11.933 11.933 0 0 1 .027 12.78L0 12.411v-.822c.005-.042.013-.084.014-.127a11.845 11.845 0 0 1 1.102-4.508 12.007 12.007 0 0 1 2.847-3.852A11.935 11.935 0 0 1 11.728.003c.947-.022 1.883.07 2.81.27 1.22.265 2.369.71 3.447 1.335a11.991 11.991 0 0 1 3.579 3.164 11.876 11.876 0 0 1 2.073 4.317c.178.712.292 1.434.334 2.168.008.146.02.292.029.439v.609c-.004.03-.011.06-.012.089a11.81 11.81 0 0 1-1.05 4.521 12.02 12.02 0 0 1-1.92 2.979 12.046 12.046 0 0 1-6.395 3.812c-.616.139-1.24.23-1.872.265-.149.008-.297.02-.446.03zm8.799-13.416c-.527-3.976-4.078-7.808-9.1-7.811-5.02-.003-8.583 3.823-9.11 7.809h.09c.64-.035 1.278-.092 1.912-.195.815-.131 1.614-.326 2.378-.639.625-.255 1.239-.54 1.855-.816.82-.368 1.673-.593 2.575-.62a7.123 7.123 0 0 1 1.947.187c.585.146 1.136.382 1.68.634.57.264 1.14.526 1.733.736 1.2.424 2.442.62 3.706.7.11.006.222.01.334.015zm-10.95 10.471v-.094c0-1.437 0-2.873-.002-4.31 0-.141-.011-.284-.035-.423a2.787 2.787 0 0 0-.775-1.495c-.564-.582-1.244-.896-2.067-.892-1.414.007-2.827.002-4.24.002h-.09a9.153 9.153 0 0 0 3.125 5.256 9.15 9.15 0 0 0 4.083 1.956zm3.689.001c1.738-.36 3.25-1.137 4.528-2.355 1.4-1.334 2.287-2.956 2.685-4.855l-.077-.003h-4.362c-.237 0-.47.038-.695.112-.667.22-1.188.635-1.588 1.206a2.673 2.673 0 0 0-.494 1.59c.008 1.4.003 2.801.003 4.202v.103zM12.05 14.22c1.215-.035 2.204-1.083 2.165-2.275-.039-1.223-1.095-2.215-2.29-2.166-1.211.05-2.2 1.108-2.15 2.302.051 1.191 1.108 2.186 2.275 2.139z"
                        fill="#858585"
                      ></path>
                    </svg>
                  </div>
                  <div className="col-span-1 text-center">
                    <span
                      style={{ height: 27, width: 25, display: "inline-block" }}
                    ></span>
                  </div>
                  {renderSeat(firstFloor)}
                </div>
              </div>
            </div>
            {numberFloor > 1 && (
              <div className="col-span-1">
                <h6 className="text-base font-medium mb-4 text-center">{t("upstair")}</h6>
                <div className="bg-alibusblurv rounded-b-md rounded-t-3xl border-alibusblurv py-6 px-2 w-20 m-auto">
                  <div className="grid grid-cols-2 justify-center items-center gap-y-3">
                    <div className="col-span-1 text-center">
                      <span
                        style={{
                          height: 27,
                          width: 25,
                          display: "inline-block",
                        }}
                      ></span>
                    </div>
                    <div className="col-span-1 text-center">
                      <span
                        style={{
                          height: 27,
                          width: 25,
                          display: "inline-block",
                        }}
                      ></span>
                    </div>
                    {renderSeat(secondFloor)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
