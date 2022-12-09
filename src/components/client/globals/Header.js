import { Avatar, Drawer, Popover, Select, Space } from "antd";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/actions/UserAction";
import { AvatarProfile, Hotline, LoginLink, Logo } from "../../global/GlobalComponent";
import { useTranslation } from "react-i18next";
const { Option } = Select;

export default function Header() {
  const [open, setOpen] = useState(false);
  const { userLogin } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };
  return (
    <header
      className="p-2 dark:bg-gray-800 dark:text-gray-100"
      style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 3px 5px" }}
    >
      <div className="xl:container flex flex-col lg:flex-row justify-between h-16 mx-auto">
        <NavLink
          to="/"
          aria-label="Go to homepage"
          className="hidden lg:flex items-center p-2"
        >
          <Logo />
        </NavLink>
        <div
          className={`grid lg:hidden items-center ${
            userLogin.name ? "grid-cols-2" : ""
          }`}
        >
          <button
            onClick={showDrawer}
            className="flex items-center lg:justify-end pl-3 focus:outline-none"
          >
            <Logo />
            <span className="text-base text-alibus">
              <CaretDownOutlined />
            </span>
          </button>
          {userLogin.name && (
            <div className="text-right pr-3">
              <AvatarProfile avatar={userLogin.avatar} />
            </div>
          )}
        </div>

        <ul className="items-stretch space-x-3 lg:flex hidden">
          <li className="flex">
            <NavLink
              to="/"
              aria-label="Go to homepage"
              className="flex items-center px-2 font-bold text-black hover:text-alibus focus:text-alibus capitalize"
            >
              {t("home")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/blog"
              aria-label="Blog"
              className="flex items-center px-2 font-bold text-black hover:text-alibus focus:text-alibus capitalize"
            >
              {t("news")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/blog/global/contact"
              aria-label="Contact"
              className="flex items-center px-2 font-bold text-black hover:text-alibus focus:text-alibus capitalize"
            >
              {t("contact")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/blog/global/info"
              aria-label="Introduce about AliBus"
              className="flex items-center px-2 font-bold text-black hover:text-alibus focus:text-alibus capitalize"
            >
              {t("about")}
            </NavLink>
          </li>
        </ul>
        <div className="lg:flex hidden justify-center">
          <Select
            defaultValue="vi"
            suffixIcon={null}
            style={{
              width: 100,
            }}
            bordered={false}
            onChange={handleChange}
            className="flex justify-center items-center"
          >
            <Option value="vi">
              <span className="font-bold mr-1">VN</span>{" "}
              <Avatar size={20} src="/images/vi.png" />
            </Option>
            <Option value="en">
              <span className="font-bold mr-1">EN</span>{" "}
              <Avatar size={20} src="/images/en.png" />
            </Option>
          </Select>
          <Hotline />

          {userLogin.name && (
            <Popover
              placement="bottomRight"
              content={
                <ul>
                  <li className="px-3 py-1.5">
                    <NavLink
                      to="/profile"
                      className="focus-visible:outline-none focus:outline-none text-black font-medium bg-white rounded-sm hover:bg-white hover:text-alibus"
                    >
                      {userLogin.name}
                    </NavLink>
                  </li>
                  <li className="px-3 py-1.5">
                    <button
                      onClick={() => dispatch(logout())}
                      className="focus-visible:outline-none focus:outline-none text-black font-medium bg-white rounded-sm hover:bg-white hover:text-alibus"
                    >
                      {t("logout")}
                    </button>
                  </li>
                </ul>
              }
              trigger="click"
            >
              <NavLink
                to="/profile"
                className="my-3 mx-1 px-2 flex items-center focus-visible:outline-none focus:outline-none text-alibus font-medium bg-white rounded-sm hover:bg-white hover:text-alibus"
              >
                <Avatar src={userLogin.avatar} />
              </NavLink>
            </Popover>
          )}
          {!userLogin.name && (
            <LoginLink />
          )}
        </div>
        <Drawer
          title={
            <div
              className={`grid py-0.5 ${userLogin.name ? "grid-cols-2" : ""}`}
            >
              <button
                onClick={onClose}
                className="focus:outline-none flex items-center justify-start pl-2.5"
              >
                <Logo />
                <span className="text-base text-alibus">
                  <CaretUpOutlined />
                </span>
              </button>
              {userLogin.name && (
                <div className="text-right pr-4 py-3">
                  <AvatarProfile avatar={userLogin.avatar} />
                </div>
              )}
            </div>
          }
          headerStyle={{
            padding: 0,
            border: "none",
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 3px 5px",
          }}
          placement="top"
          onClose={onClose}
          closeIcon={false}
          height={"100%"}
          className="block lg:hidden"
          visible={open}
          width={"100%"}
        >
          <ul>
            <li className="flex py-2.5 text-lg font-medium">
              <NavLink
                to="/"
                aria-label="Go to homepage"
                className="flex items-center px-2 text-black hover:text-alibus focus:text-alibus font-medium capitalize"
              >
                {t("home")}
              </NavLink>
            </li>
            <li className="flex py-2.5 text-lg font-medium">
              <NavLink
                to="/blog"
                aria-label="Blog"
                className="flex items-center px-2 text-black hover:text-alibus focus:text-alibus font-medium capitalize"
              >
                {t("news")}
              </NavLink>
            </li>
            <li className="flex py-2.5 text-lg font-medium">
              <NavLink
                to="/blog/global/contact"
                aria-label="Contact"
                className="flex items-center px-2 text-black hover:text-alibus focus:text-alibus font-medium capitalize"
              >
                {t("contact")}
              </NavLink>
            </li>
            <li className="flex py-2.5 text-lg font-medium">
              <NavLink
                to="/blog/global/info"
                aria-label="Introduce about AliBus"
                className="flex items-center px-2 text-black hover:text-alibus focus:text-alibus font-medium capitalize"
              >
                {t("about")}
              </NavLink>
            </li>
            <li className="flex py-2.5 text-lg font-medium">
              <Select
                defaultValue="vi"
                suffixIcon={null}
                style={{
                  width: 120,
                }}
                bordered={false}
                onChange={handleChange}
                className="flex justify-center items-center"
              >
                <Option value="vi">
                  <Space>
                    <Avatar shape="square" size={28} src="/images/vi.png" />
                    <span className="font-medium text-base">VN</span>
                  </Space>
                </Option>
                <Option value="en">
                  <Space>
                    <Avatar shape="square" size={28} src="/images/en.png" />
                    <span className="font-medium text-base">EN</span>
                  </Space>
                </Option>
              </Select>
            </li>
            <li className="grid grid-cols-2 py-2.5 text-lg font-medium">
              <Hotline />
              {userLogin.name && (
                <button
                  onClick={() => dispatch(logout())}
                  className="mx-1 p-2 flex items-center justify-center focus-visible:outline-none focus:outline-none text-white bg-alibus rounded-sm hover:bg-alibus hover:text-white font-medium"
                >
                  {t("logout")}
                </button>
              )}
              {!userLogin.name && (
                <LoginLink />
              )}
            </li>
          </ul>
        </Drawer>
      </div>
    </header>
  );
}
