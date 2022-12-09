import React from "react";
import { SketchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export default function Utilities() {
  const { t } = useTranslation();
  const data = [
    { title: t("amenitiesTxt1"), content: t("amenitiesTxt2") },
    { title: t("amenitiesTxt3"), content: t("amenitiesTxt4") },
    { title: t("amenitiesTxt5"), content: t("amenitiesTxt6") },
    { title: t("amenitiesTxt7"), content: t("amenitiesTxt8") },
    { title: t("amenitiesTxt9"), content: t("amenitiesTxt10") },
    { title: t("amenitiesTxt11"), content: t("amenitiesTxt12") },
    { title: t("amenitiesTxt13"), content: t("amenitiesTxt14") },
    { title: t("amenitiesTxt15"), content: t("amenitiesTxt16") },
  ];
  return (
    <div className="hover:text-black text-black text-sm">
      <div className="p-4 my-2 sm:mx-10 bg-gray-200 rounded-md">
        {data?.map((i, idx) => {
          return (
            <div key={idx} className="py-1">
              <h2 className="flex items-center gap-2 leading-tight tracking-wide py-2">
                <SketchOutlined className="text-alibus" />
                <span className="font-medium">{i.title}</span>
              </h2>
              <p className="flex-1 dark:text-gray-400 tracking-wide pb-2">
                {i.content}
              </p>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}
