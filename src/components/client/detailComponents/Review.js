import React from "react";
import { StarFilled } from "@ant-design/icons";
import { Progress, Rate, Tag } from "antd";
import { t } from "i18next";
import _ from "lodash";

export default function Review({ data }) {
  const { rate, comments, starAvg } = data;
  return (
    <div className="mx-3 sm:mx-10 hover:text-black text-black">
      <div>
        <Tag
          color="#f47920"
          className="inline-flex px-2 py-1 items-center text-sm"
        >
          <StarFilled /> <span>{starAvg}</span>
        </Tag>
        <span>
          <Rate disabled allowHalf defaultValue={starAvg} />
          <span className="ant-rate-text">{comments} <span className="lowercase">{t("reviews")}</span></span>
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:sm:grid-cols-3 gap-x-20 gap-y-8 mt-10">
        {_.map(rate, function(value, key) {
          return (
            <div className="col-span-1" key={key}>
              <span className="capitalize">{key}</span>
              <Progress percent={value * 10} strokeColor="#f47920" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
