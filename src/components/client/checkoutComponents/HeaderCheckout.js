import { NavLink } from "react-router-dom";
import React from "react";
import { Logo } from "../../global/GlobalComponent";
import { useTranslation } from "react-i18next";
import { Avatar, Select } from "antd";
const { Option } = Select;

export default function HeaderCheckout({ time }) {
  const { t, i18n } = useTranslation();
  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };
  return (
    <header
      className="p-2 dark:bg-gray-800 dark:text-gray-100 fixed top-0 w-full z-10 bg-white"
      style={{ boxShadow: "rgb(0 0 0 / 5%) 0px 3px 5px" }}
    >
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink
          to="/home"
          aria-label="Go to homepage"
          className="sm:flex items-center p-2 hidden"
        >
          <Logo />
        </NavLink>
        <div className="flex flex-col w-full sm:w-auto items-center justify-center">
          <div>
            <span>{t("timer")}</span>
          </div>
          <div>
            <span className="text-3xl text-red-600 font-bold">{time}</span>
          </div>
        </div>
        <Select
            defaultValue="vi"
            suffixIcon={null}
            style={{
              width: 100,
            }}
            bordered={false}
            onChange={handleChange}
            className="sm:flex justify-center items-center hidden"
          >
            <Option value="vi">
              <span className="font-bold mr-1">VN</span>{" "}
              <Avatar size={20} src="images/vi.png" />
            </Option>
            <Option value="en">
              <span className="font-bold mr-1">EN</span>{" "}
              <Avatar size={20} src="images/en.png" />
            </Option>
          </Select>
      </div>
    </header>
  );
}
