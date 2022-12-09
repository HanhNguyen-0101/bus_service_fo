import React, { Component } from "react";
import Slider from "react-slick";

function SampleArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", margin: "0 26px", zIndex: 1 }}
      onClick={onClick}
    />
  );
}

export default class SliderSyncing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    const settingFirst = {
      dots: false,
      infinite: true,
      nextArrow: <SampleArrow />,
      prevArrow: <SampleArrow />,
    };
    const settingSecond = {
      dots: false,
      infinite: true,
      arrows: false,
      slidesToShow: 3,
      swipeToSlide: true,
      focusOnSelect: true,
    };
    const { data } = this.props;
    return (
      <div className="text-center p-2">
        <Slider
          className="max-w-2xl m-auto"
          asNavFor={this.state.nav2}
          ref={(slider) => (this.slider1 = slider)}
          {...settingFirst}
        >
          {data?.map((img, idx) => {
            return (
              <div className="m-auto" key={idx}>
                <img className="m-auto" alt={img} src={img} />
              </div>
            );
          })}
        </Slider>
        <Slider
          asNavFor={this.state.nav1}
          ref={(slider) => (this.slider2 = slider)}
          {...settingSecond}
        >
          {data?.map((img, idx) => {
            return (
              <div className="p-2" key={idx}>
                <img alt={img} src={img} />
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
