import React from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";

function SampleArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", margin: "-28px 35px 0", zIndex: 1 }}
        onClick={onClick} />
    );
  }
  
export default function MultipleRows({ title, data }) {
  let sliders = 1;
  if (window.innerWidth >= 768) {
    sliders = 2;
  }
  if (window.innerWidth >= 1024) {
    sliders = 3;
  }
  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: sliders,
    speed: 500,
    rows: 2,
    autoplay: true,
    centerPadding: "60px",
    nextArrow: <SampleArrow />,
    prevArrow: <SampleArrow />
  };
  const renderItem = () => {
    return data?.map((i, idx) => {
      return (
        <div className="item-multiple-rows p-2" key={idx}>
          <div className="rounded-md border shadow-md">
            <NavLink
              to={encodeURI(`/blog/${i.id}/${i.title}`)}
              className="hover:text-black max-w-sm mx-auto group hover:no-underline focus:no-underline"
            >
              {i.image && (
                <img
                  role="presentation"
                  className="object-cover w-full rounded h-44 dark:bg-gray-500"
                  src={i.image}
                  alt={i.image}
                />
              )}
              <div className="p-6 space-y-2">
                {i.title && (
                  <h3 className="text-base font-semibold group-hover:no-underline h-12 group-focus:no-underline">
                    {i.title.length > 55
                      ? `${i.title.slice(0, 55)}...`
                      : i.title}
                  </h3>
                )}
                {i.description && (
                  <div
                    className="h-20 overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: i.description }}
                  />
                )}
              </div>
            </NavLink>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="multiple-rows-carousel">
      {title && (
        <h2 className="text-black text-2xl font-medium py-4"> {title} </h2>
      )}
      <Slider {...settings} className="h-100">
        {renderItem()}
      </Slider>
    </div>
  );
}
