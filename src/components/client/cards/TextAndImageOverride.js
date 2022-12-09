import React from "react";
import { NavLink } from "react-router-dom";

export default function TextAndImageOverride({ data }) {
  const { title, image, id } = data;
  return (
    <div className="relative rounded-md border-transparent">
      <NavLink to={encodeURI(`/blog/${id}/${title}`)} target="_blank">
        <img src={image} alt={image} className="rounded-md" />
        <div className="absolute bottom-0 left-0 right-0 px-4 py-2 rounded-b-md text-center bg-gray-800 opacity-70">
          {title && <h3 className="text-xl text-white font-bold">{title}</h3>}
        </div>
      </NavLink>
    </div>
  );
}
