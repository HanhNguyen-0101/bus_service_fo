import React from "react";
import SearchForm from "../forms/SearchForm";

export default function Hero({ data }) {
  const { title, description, banner } = data && data.length ? data[0] : {};
  if (banner) {
    return (
      <div
        className="flex items-center bg-cover p-10 md:py-32 md:px-16"
        style={{
          backgroundImage: `url("${banner.replace(/\\/g, "\\\\")}")`,
        }}
      >
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3x text-white">
          {title && (
            <h1 className="text-4xl font-bold leading-none sm:text-5xl text-white pb-4">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-2xl font-bold leading-none sm:text-2xl text-white pb-4">
              {description}
            </p>
          )}
          <div className="max-w-6xl w-full m-auto">
            <SearchForm />
          </div>
        </div>
      </div>
    );
  } else {
    return "";
  }
}
