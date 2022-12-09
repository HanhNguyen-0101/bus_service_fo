import React from "react";
import { Collapse, Popover, Space, Tag } from "antd";
import HorizontalCenter from "../tabs/HorizontalCenter";
import StepsProgress from "../steps/StepsProgress";
import { StarFilled, TrophyOutlined, SwapOutlined } from "@ant-design/icons";
import moment from "moment";
import { SEAT_STATUS } from "../../../utils/constant";
import { t } from "i18next";
import _ from "lodash";
const { Panel } = Collapse;

export default function TextAndImageHorizontal({ data }) {
  const {
    busCompanyObj,
    tripObj,
    numberSeat,
    busTypeObj,
    seats,
    promo,
    point,
  } = data;
  const seatsBooked = seats?.filter((i) => i.status === SEAT_STATUS.BOOKED);
  let star = 0;
  _.map(busCompanyObj?.review, function (value, key) {
    star += value;
  })
  const starAvg = star / (2 * Object.keys(busCompanyObj?.review).length);

  return (
    <div className="car-item transition-all rounded-md dark:bg-gray-800 dark:text-gray-50 my-3 shadow-xl shadow-gray-900">
      <div className="flex items-center pt-3 px-3 pb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6 text-alibus mr-2"
        >
          <path
            fillRule="evenodd"
            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          ></path>
        </svg>
        <Popover
          content={
            <div>
              <p className="policy-group-title font-medium">
                Yêu cầu khi lên xe
              </p>
              <ul className="pl-4 list-disc">
                <li>Không mang đồ ăn, thức ăn có mùi lên xe</li>
                <li>
                  Không hút thuốc, uống rượu, sử dụng chất kích thích trên xe
                </li>
                <li>Không mang các vật dễ cháy nổ lên xe</li>
                <li>Không vứt rác trên xe</li>
                <li>Không làm ồn, gây mất trật tự trên xe</li>
                <li>Không mang giày, dép trên xe</li>
              </ul>
            </div>
          }
          title={null}
          placement="topLeft"
        >
          <span
            className="text-alibus bg-transparent hover:text-alibus focus:text-alibus underline hover:underline"
            type="primary"
          >
            {t("required")}
          </span>
        </Popover>
      </div>
      <div className="container grid grid-cols-12 mx-auto dark:bg-gray-900 pt-2 pb-3 px-3">
        <div
          className="bg-no-repeat bg-cover dark:bg-gray-700 col-span-full lg:col-span-4"
          style={{
            backgroundImage: `url(${_.last(busCompanyObj?.image)})`,
            backgroundPosition: "center center",
            backgroundBlendMode: "multiply",
            backgroundSize: "cover",
          }}
        />
        <div className="flex flex-col p-6 col-span-full lg:col-span-8 lg:p-10">
          <div className="grid grid-cols-1 sm:flex relative">
            <div className="flex">
              <h1 className="text-xl font-semibold inline-block pr-2">
                {busCompanyObj?.name}
              </h1>
              <Tag
                color="#f47920"
                className="inline-flex px-2 items-center text-sm"
              >
                <StarFilled />{" "}
                <span>{`${starAvg} (${busCompanyObj?.comments})`}</span>
              </Tag>
            </div>
            <span className="text-2xl font-bold text-alibus sm:absolute right-0 text-right">
              {tripObj?.price.toLocaleString()}đ
            </span>
          </div>
          <div className="sm:flex relative py-3">
            <span className="capitalize">
              {t("numberSeatTxt", { busType: busTypeObj?.name, numberSeat })}
            </span>
            <p className="text-gray-400 sm:ml-3 font-medium flex items-center">
              <TrophyOutlined /> <span className="px-1">{t("sponsor")}</span>
            </p>
            <Tag color="orange" className="absolute right-0 m-0">
              {t("discount", {
                percent: promo?.percent * 100,
                max: promo?.max,
              })}
            </Tag>
          </div>
          {tripObj && (
            <div className="grid grid-cols-1 sm:flex sm:items-center relative py-3">
              <div className="flex">
                <svg
                  className="TicketPC__LocationRouteSVG-sc-1mxgwjh-4 eKNjJr"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="74"
                  viewBox="0 0 14 74"
                >
                  <path
                    fill="none"
                    stroke="#787878"
                    strokeLinecap="round"
                    strokeWidth="2"
                    strokeDasharray="0 7"
                    d="M7 13.5v46"
                  ></path>
                  <g fill="none" stroke="#484848" strokeWidth="3">
                    <circle cx="7" cy="7" r="7" stroke="none"></circle>
                    <circle cx="7" cy="7" r="5.5"></circle>
                  </g>
                  <path
                    d="M7 58a5.953 5.953 0 0 0-6 5.891 5.657 5.657 0 0 0 .525 2.4 37.124 37.124 0 0 0 5.222 7.591.338.338 0 0 0 .506 0 37.142 37.142 0 0 0 5.222-7.582A5.655 5.655 0 0 0 13 63.9 5.953 5.953 0 0 0 7 58zm0 8.95a3.092 3.092 0 0 1-3.117-3.06 3.117 3.117 0 0 1 6.234 0A3.092 3.092 0 0 1 7 66.95z"
                    fill="#787878"
                  ></path>
                </svg>
                <div className="px-2 inline-block">
                  <div className="flex items-center">
                    <Space>
                      <span className="font-bold text-xl">
                        {moment(tripObj.tripAt).format("HH:mm")}{" "}
                      </span>
                      <span className="text-base">
                        {tripObj.fromStationObj.name}
                      </span>
                    </Space>
                  </div>
                  <div className="text-gray-400">{`${Math.floor(
                    tripObj.startTime / 60
                  )}h${tripObj.startTime % 60}m`}</div>
                  <div className="flex items-center">
                    <Space>
                      <span className="font-bold text-xl">
                        {moment(tripObj.tripAt)
                          .add(tripObj.startTime, "minutes")
                          .format("HH:mm")}
                      </span>
                      <span className="text-base">
                        {tripObj.toStationObj.name}
                      </span>
                    </Space>
                  </div>
                </div>
              </div>
              <span className="text-base sm:absolute right-0 text-right pt-4 sm:pt-0">
                {t("seatLeft", {
                  seatLeft: numberSeat - (seatsBooked ? seatsBooked.length : 0),
                })}
              </span>
            </div>
          )}
        </div>
      </div>

      <Collapse
        onChange={() => {}}
        className="border-none rounded-md"
        expandIcon={({ isActive }) => {}}
      >
        <Panel
          className="bg-white"
          style={{ border: "none" }}
          header={
            <span className="text-base font-medium text-alibus flex items-center justify-end">
              <SwapOutlined rotate={90} />
              <span className="ml-1">{t("detail")}</span>
            </span>
          }
          key="1"
        >
          <div className="w-100 m-auto">
            <HorizontalCenter
              imageData={busCompanyObj?.image}
              rate={busCompanyObj?.review}
              starAvg={starAvg}
              comments={busCompanyObj?.comments}
              point={point}
            />
          </div>
        </Panel>
        <Panel
          className="bg-white"
          style={{
            border: "none",
            borderBottomLeftRadius: "0.375rem",
            borderBottomRightRadius: "0.375rem",
          }}
          header={
            <span className="font-medium text-base text-alibus flex items-center justify-end">
              <SwapOutlined rotate={90} />{" "}
              <span className="ml-1">{t("book")}</span>
            </span>
          }
          key="2"
        >
          <div className="hover:text-black text-black sm:mx-4">
            <StepsProgress data={data} />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
