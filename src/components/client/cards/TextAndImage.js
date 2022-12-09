import React from "react";
import { NavLink } from "react-router-dom";

export default function TextAndImage({ data }) {
  const { id, image, title, subTitle, hashtag } = data;
  const bg = hashtag.includes(1, 0) ? "rgb(88, 82, 121)" : "white";
  const color = hashtag.includes(1, 0) ? "white" : "black";
  return (
    <div className="rounded-md border shadow-md dark:bg-gray-900 dark:text-gray-100 w-100">
      <NavLink to={encodeURI(`/blog/${id}/${title}`)} target="_blank">
        <img
          src={image}
          alt={image}
          className="object-cover object-center w-full rounded-t-md h-40 dark:bg-gray-500"
        />
        <div
          className="flex flex-col justify-between p-6 space-y-8 rounded-b-md"
          style={{ backgroundColor: bg, color: color, minHeight: 145 }}
        >
          <div className="space-y-2 pb-10">
            {title && (
              <h2
                className="text-xl font-semibold tracking-wide"
                style={{ color: color }}
              >
                {title}
              </h2>
            )}
            {subTitle && <p style={{ color: color }}>{subTitle}</p>}
          </div>
        </div>
      </NavLink>
    </div>
  );
}
