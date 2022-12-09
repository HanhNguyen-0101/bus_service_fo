import React from "react";
import Slider from "react-slick";

export default function MultipleItems({ComponentItem, title, data}) {
  let sliders = 1;
  if (window.innerWidth >= 768) {
    sliders = 2;
  }
  if (window.innerWidth >= 1024) {
    sliders = 4;
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: sliders,
    slidesToScroll: 1,
  };
  const renderItem = () => {
    return data?.map((i, idx) => {
      return (
        <div className="px-2" key={idx}>
          <ComponentItem data={i} />
        </div>
      )
    });
  }
  return (
    <div className="multiple-carousel">
      <h2 className="text-black text-2xl font-medium py-4"> {title} </h2>
      <Slider {...settings} className='h-100'>
        {renderItem()}
      </Slider>
    </div>
  );
}
