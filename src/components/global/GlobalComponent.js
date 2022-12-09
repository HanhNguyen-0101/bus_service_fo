import { Avatar, Popover } from "antd";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export const Logo = () => {
  return (
    <>
      <img src="/favicon.png" width={60} alt="favicon.png" />
      <h1 className="text-3xl px-2 font-bold text-alibus font-sans">AliBus</h1>
    </>
  );
};

export const AvatarProfile = ({ avatar }) => {
  return (
    <NavLink to="/profile">
      <Avatar size={45} src={avatar} />
    </NavLink>
  );
};

export const Hotline = () => {
  return (
    <Popover
      placement="bottomRight"
      content={
        <div>
          <a href="tel:1900888684">
            <span className="text-alibus hover:text-alibus">1900868024 - </span>
          </a>
          {t("hotline")}
        </div>
      }
      trigger="click"
    >
      <button className="border mx-1 lg:my-4 px-2 focus-visible:outline-none focus:outline-none text-black hover:bg-gray-200 rounded-sm bg-gray-300">
        <i className="fa fa-phone"></i> Hotline
      </button>
    </Popover>
  );
};

export const LoginLink = () => {
  const {t} = useTranslation();
  return (
    <NavLink
      to={"/login"}
      className="mx-1 p-2 lg:my-4 lg:py-0 flex items-center justify-center focus-visible:outline-none focus:outline-none text-white bg-alibus rounded-sm hover:bg-alibusblur"
    >
      <i className="fa fa-user-circle mt-1 mr-1"></i> {t("login")}
    </NavLink>
  );
};
