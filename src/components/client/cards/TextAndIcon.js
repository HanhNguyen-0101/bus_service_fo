import React from "react";
import { NavLink } from "react-router-dom";

export default function TextAndIcon({ data }) {
  const { title, subTitle, image, link } = data;
  return (
    <NavLink to={`/${link}`} className={`hover:text-alibus focus:text-alibus ${link ? '': 'pointer-events-none'}`}>
      <div className="max-w-md p-2 flex sm:space-x-6 dark:bg-gray-900 dark:text-gray-100 border rounded-md">
        <div className="flex-shrink-0 mb-6 h-22 h-16 w-16 sm:mb-0">
          <img
            src={image}
            alt={image}
            className="object-cover object-center w-full h-full rounded dark:bg-gray-500"
          />
        </div>
        <div className="flex flex-col space-y-4">
          {title && (
            <div>
              <h2 className="text-2xl font-semibold">{title}</h2>
            </div>
          )}
          {subTitle && (
            <div className="space-y-1">
              <span className="dark:text-gray-400 hover:text-alibus focus:text-alibus">{subTitle}</span>
            </div>
          )}
        </div>
      </div>
    </NavLink>
  );
}
