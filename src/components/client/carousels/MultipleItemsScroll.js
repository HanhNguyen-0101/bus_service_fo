import React from "react";

export default function MultipleItemsScroll({ ComponentItem, title, data }) {
  const renderItem = () => {
    return data?.map((i, idx) => {
      return (
        <div className="relative flex flex-shrink-0 h-100 w-full md:w-1/2 lg:w-1/4" key={idx}>
          <ComponentItem data={i} />
        </div>
      );
    });
  };
  return (
    <div className="multiple-carousel-scroll">
      {title && (
        <h2 className="text-black text-2xl font-medium py-4"> {title} </h2>
      )}
      <div className="relative flex items-center justify-center w-full dark:text-gray-50">
        <div className="flex items-center justify-start w-full h-full gap-6 pb-4 mx-auto overflow-auto lg:gap-8">
          {renderItem()}
        </div>
      </div>
    </div>
  );
}
