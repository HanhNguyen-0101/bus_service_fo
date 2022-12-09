import { Layout } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../../global/GlobalComponent";
import {
  UserOutlined,
  BankOutlined,
  BranchesOutlined,
  ClusterOutlined,
  CarOutlined,
  InsertRowBelowOutlined,
  SendOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
const { Sider } = Layout;

export default function SliderNavBar() {
  const { t } = useTranslation();
  const items = [
    {
      key: "0",
      icon: <GlobalOutlined />,
      label: t("manage", {title: t("general")}),
      to: "/admin/global",
    },
    {
      key: "1",
      icon: <UserOutlined />,
      label: t("manage", {title: t("user")}),
      to: "/admin/users",
    },
    {
      key: "2",
      icon: <BankOutlined />,
      label: t("manage", {title: t("place")}),
      to: "/admin/station",
    },
    {
      key: "3",
      icon: <BranchesOutlined />,
      label: t("manage", {title: t("trip")}),
      to: "/admin/trips",
    },
    {
      key: "4",
      icon: <ClusterOutlined />,
      label: t("manage", {title: t("company")}),
      to: "/admin/companies",
    },
    {
      key: "5",
      icon: <CarOutlined />,
      label: t("manage", {title: t("bus")}),
      to: "/admin/vehicles",
    },
    {
      key: "6",
      icon: <InsertRowBelowOutlined />,
      label: t("manage", {title: t("seat")}),
      to: "/admin/seats",
    },
    {
      key: "7",
      icon: <SendOutlined />,
      label: t("manage", {title: t("ticket")}),
      to: "/admin/tickets",
    },
  ];
  return (
    <Sider trigger={null} collapsible className="bg-white hidden lg:block" width="auto">
      <div className="logo px-3 flex items-center relative">
        <NavLink
          to="/admin"
          aria-label="Go to homepage"
          className="flex items-center p-2"
        >
          <Logo />
        </NavLink>
      </div>
      <ul className="pt-2 pb-4 space-y-1 text-sm text-black">
        {items.map((nav, idx) => {
          return (
            <li key={nav.key}>
              <NavLink
                className="flex items-center py-3 px-4 space-x-3 adminLink text-black hover:text-alibus font-medium"
                to={nav.to}
                activeClassName="bg-alibus text-white"
              >
                {nav.icon}
                <span className="adminNav capitalize">{nav.label}</span>
              </NavLink>
            </li>
          );
        })}
        <div className="absolute bottom-0 w-full text-xs text-center bg-gray-200 p-2">
            {t("copyright")} <br /><span>{t("author")}</span>
        </div>
      </ul>
    </Sider>
  );
}
