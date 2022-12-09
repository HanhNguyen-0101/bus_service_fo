import { Tabs } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import SliderSyncing from "../carousels/SliderSyncing";
import Policy from "../detailComponents/Policy";
import Review from "../detailComponents/Review";
import StartEndPoint from "../detailComponents/StartEndPoint";
import Utilities from "../detailComponents/Utilities";
const { TabPane } = Tabs;

export default function HorizontalCenter({ imageData, rate, comments, point, starAvg }) {
  const {t}= useTranslation();
  const data = [
    {
      id: 1,
      title: t("photos"),
      content: <SliderSyncing data={imageData} />,
    },
    {
      id: 2,
      title: t("amenities"),
      content: <Utilities />,
    },
    {
      id: 3,
      title: t("pickUpDropOff"),
      content: <StartEndPoint data={point} />,
    },
    {
      id: 4,
      title: t("policies"),
      content: <Policy />,
    },
    {
      id: 5,
      title: t("reviews"),
      content: <Review data={{ rate, comments, starAvg }} />,
    },
  ];
  const renderItem = () => {
    if (window.innerWidth < 768) {
      data.splice(2, 1);
    }
    return data.map((i, idx) => {
      return (
        <TabPane
          className="hover:text-alibus focus:text-alibus text-base"
          tab={
            <span className="hover:font-medium hover:text-alibus focus:text-alibus text-base font-medium">
              {i.title}
            </span>
          }
          key={idx}
        >
          {i.content}
        </TabPane>
      );
    });
  };
  return (
    <Tabs defaultActiveKey="0" centered>
      {renderItem()}
    </Tabs>
  );
}
