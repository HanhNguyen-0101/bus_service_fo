import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getArticleByHashTag,
  getFromToOfArray,
} from "../../../models/GlobalModel";
import { getAllBusCompany } from "../../../redux/actions/BusCompanyAction";
import { getAllArticle } from "../../../redux/actions/GlobalAction";
import { setLocation } from "../../../redux/actions/SearchAction";
import { getTrip } from "../../../redux/actions/TripAction";
import { HASHTAG } from "../../../utils/constant";
import { removeAccents } from "../../../utils/stringFunc";

export default function Footer() {
  const { tripList } = useSelector((state) => state.TripReducer);
  const { busCompanies } = useSelector((state) => state.BusCompanyReducer);
  const { articles } = useSelector((state) => state.GlobalReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getTrip());
    dispatch(getAllBusCompany());
    dispatch(getAllArticle());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const renderRoutes = () => {
    return tripList?.map((i, idx) => {
      return (
        <NavLink
          to={`/your-trip/from=${removeAccents(
            i.fromStationObj.name?.replace(/ /g, "_").toLowerCase()
          )}&&to=${removeAccents(
            i.toStationObj.name?.replace(/ /g, "_").toLowerCase()
          )}`}
          key={idx}
          className="hover:text-alibus focus:text-alibus text-left focus:outline-none"
          onClick={() => {
            dispatch(
              setLocation({
                from: i.fromStationObj,
                to: i.toStationObj,
              })
            );
          }}
        >
          {t("routesFromTo", {
            from: i.toStationObj.name,
            to: i.fromStationObj.name,
          })}
        </NavLink>
      );
    });
  };
  const renderStation = () => {
    return getArticleByHashTag(articles, HASHTAG.STATION)?.map((i, idx) => {
      return (
        <NavLink
          to={encodeURI(`/blog/${i.id}/${i.title}`)}
          key={idx}
          aria-label={i.title}
          className="hover:text-alibus focus:text-alibus"
        >
          {i.title}
        </NavLink>
      );
    });
  };
  const renderBusCompany = (start = 0, size = 7) => {
    const maxLength = start + size;
    if (busCompanies.length >= maxLength) {
      const companies = [...busCompanies];
      return companies?.splice(start, size).map((i, idx) => {
        return (
          <NavLink
            to={encodeURI(`/company/${i.id}/${i.name}`)}
            key={idx}
            aria-label={i.name}
            className="hover:text-alibus focus:text-alibus"
          >
            {i.name}
          </NavLink>
        );
      });
    }
  };
  const renderArticles = () => {
    const newArr = getArticleByHashTag(articles, HASHTAG.NEWS);
    return getFromToOfArray(newArr, 0, 4)?.map((i, idx) => {
      return (
        <NavLink
          to={encodeURI(`/blog/${i.id}/${i.title}`)}
          key={idx}
          aria-label={t("news")}
          className="hover:text-alibus focus:text-alibus"
        >
          {i.title}
        </NavLink>
      );
    });
  };
  return (
    <footer>
      <div className="p-6 bg-gray-200">
        <div className="xl:container py-4 sm:grid sm:grid-cols-3 lg:grid-cols-6 mx-auto gap-x-3 gap-y-8">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
              <NavLink
                to="/"
                aria-label="Go to homepage"
                className="flex flex-col justify-center items-center"
              >
                <img src="favicon.png" width={100} alt="favicon.png" />
                <br />
                <h1 className="text-3xl px-2 font-bold text-alibus font-sans">
                  AliBus
                </h1>
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="font-medium capitalize pt-4 sm:pt-0">
              {t("routes")}
            </h2>
            <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
              {renderRoutes()}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="font-medium capitalize pt-4 sm:pt-0">
              {t("station")}
            </h2>
            <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
              {renderStation()}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="font-medium capitalize pt-4 sm:pt-0">
              {t("company")}
            </h2>
            <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
              {renderBusCompany(0)}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="font-medium capitalize"> </h2>
            <br />
            <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
              {renderBusCompany(7)}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="font-medium capitalize"> </h2>
            <br />
            <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
              {renderBusCompany(14)}
            </div>
          </div>
          <div className="flex flex-col space-y-4 col-span-2 sm:col-span-3 lg:col-span-2">
            <h2 className="font-medium capitalize pt-4 sm:pt-0">{t("news")}</h2>
            <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
              {renderArticles()}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="font-medium capitalize pt-4 sm:pt-0">
              {t("about")}
            </h2>
            <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
              <NavLink
                to="/blog/global/info"
                aria-label="Infomation about AliBus"
                className="hover:text-alibus focus:text-alibus capitalize"
              >
                {t("aboutAlibus")}
              </NavLink>
              <NavLink
                to="/blog"
                aria-label={t("news")}
                className="hover:text-alibus focus:text-alibus capitalize"
              >
                {t("news")}
              </NavLink>
              <NavLink
                to="/blog/global/contact"
                aria-label="Contact"
                className="hover:text-alibus focus:text-alibus capitalize"
              >
                {t("contact")}
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col space-y-4 sm:col-span-1 lg:col-span-2">
            <h2 className="font-medium capitalize pt-4 sm:pt-0">
              {t("support")}
            </h2>
            <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
              <NavLink
                to="/blog/global/payment-instruction"
                aria-label="Payment Instructions"
                className="hover:text-alibus focus:text-alibus capitalize"
              >
                {t("intropayment")}
              </NavLink>
              <NavLink
                to="/blog/global/tandc"
                aria-label="Terms & Conditions"
                className="hover:text-alibus focus:text-alibus capitalize"
              >
                {t("term")}
              </NavLink>
              <NavLink
                to="/blog/global/privacy-policy"
                aria-label="Privacy policy"
                className="hover:text-alibus focus:text-alibus capitalize"
              >
                {t("privacy")}
              </NavLink>
              <NavLink
                to="/blog/global/faq"
                aria-label="FAQs"
                className="hover:text-alibus focus:text-alibus capitalize"
              >
                {t("q&a")}
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col space-y-4 col-span-1">
            <h2 className="font-medium capitalize pt-4 sm:pt-0">
              {t("social")}
            </h2>
            <div className="grid grid-cols-3">
              <a
                rel="noopener noreferrer"
                href="https://www.instagram.com/"
                title="Instagram"
                className="flex items-center justify-start rounded-full text-alibus hover:text-alibusblur"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 2.88c4.271 0 4.781 0.021 6.469 0.093 1.557 0.073 2.405 0.333 2.968 0.553 0.751 0.291 1.276 0.635 1.844 1.197 0.557 0.557 0.901 1.088 1.192 1.839 0.22 0.563 0.48 1.411 0.553 2.968 0.072 1.688 0.093 2.199 0.093 6.469s-0.021 4.781-0.099 6.469c-0.084 1.557-0.344 2.405-0.563 2.968-0.303 0.751-0.641 1.276-1.199 1.844-0.563 0.557-1.099 0.901-1.844 1.192-0.556 0.22-1.416 0.48-2.979 0.553-1.697 0.072-2.197 0.093-6.479 0.093s-4.781-0.021-6.48-0.099c-1.557-0.084-2.416-0.344-2.979-0.563-0.76-0.303-1.281-0.641-1.839-1.199-0.563-0.563-0.921-1.099-1.197-1.844-0.224-0.556-0.48-1.416-0.563-2.979-0.057-1.677-0.084-2.197-0.084-6.459 0-4.26 0.027-4.781 0.084-6.479 0.083-1.563 0.339-2.421 0.563-2.979 0.276-0.761 0.635-1.281 1.197-1.844 0.557-0.557 1.079-0.917 1.839-1.199 0.563-0.219 1.401-0.479 2.964-0.557 1.697-0.061 2.197-0.083 6.473-0.083zM16 7.787c-4.541 0-8.213 3.677-8.213 8.213 0 4.541 3.677 8.213 8.213 8.213 4.541 0 8.213-3.677 8.213-8.213 0-4.541-3.677-8.213-8.213-8.213zM16 21.333c-2.948 0-5.333-2.385-5.333-5.333s2.385-5.333 5.333-5.333c2.948 0 5.333 2.385 5.333 5.333s-2.385 5.333-5.333 5.333zM26.464 7.459c0 1.063-0.865 1.921-1.923 1.921-1.063 0-1.921-0.859-1.921-1.921 0-1.057 0.864-1.917 1.921-1.917s1.923 0.86 1.923 1.917z"></path>
                </svg>
              </a>
              <a
                rel="noopener noreferrer"
                href="https://www.pinterest.com/"
                title="Pinterest"
                className="flex items-center justify-start rounded-full text-alibus hover:text-alibusblur"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  className="w-8 h-8"
                >
                  <path d="M16.021 0c-8.828 0-15.984 7.156-15.984 15.984 0 6.771 4.214 12.552 10.161 14.88-0.141-1.266-0.266-3.203 0.052-4.583 0.292-1.25 1.875-7.943 1.875-7.943s-0.479-0.964-0.479-2.375c0-2.219 1.292-3.88 2.891-3.88 1.365 0 2.026 1.021 2.026 2.25 0 1.37-0.87 3.422-1.323 5.323-0.38 1.589 0.797 2.885 2.365 2.885 2.839 0 5.026-2.995 5.026-7.318 0-3.813-2.75-6.49-6.677-6.49-4.547 0-7.214 3.417-7.214 6.932 0 1.375 0.526 2.854 1.188 3.651 0.13 0.161 0.146 0.302 0.109 0.464-0.12 0.5-0.391 1.599-0.443 1.818-0.073 0.297-0.229 0.359-0.536 0.219-1.99-0.922-3.245-3.839-3.245-6.193 0-5.036 3.667-9.672 10.563-9.672 5.542 0 9.854 3.958 9.854 9.229 0 5.516-3.474 9.953-8.307 9.953-1.62 0-3.141-0.839-3.677-1.839l-1 3.797c-0.359 1.391-1.339 3.135-2 4.193 1.5 0.458 3.078 0.714 4.734 0.714 8.813 0 15.979-7.151 15.979-15.984 0-8.828-7.167-15.979-15.979-15.979z"></path>
                </svg>
              </a>
              <a
                rel="noopener noreferrer"
                href="https://www.facebook.com/"
                title="Facebook"
                className="flex items-center justify-start rounded-full text-alibus hover:text-alibusblur"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  className="w-8 h-8"
                >
                  <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="xl:container flex items-center justify-center px-6 text-sm">
          <div className="dark:text-gray-400 text-center">
            <h3 className="text-2xl text-alibus pb-2 font-bold">
              {t("myCompany")}
            </h3>
            {t("myAddress")}
            <br />
            {`${t("copyright")} ${t("author")}`}
          </div>
        </div>
      </div>
    </footer>
  );
}
