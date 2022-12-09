import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import {
  getArticleByHashTag,
  getFromToOfArray,
} from "../../../models/GlobalModel";
import { HASHTAG } from "../../../utils/constant";
import MultipleRows from "../carousels/MultipleRows";

function Item({ data }) {
  const { id, title, description } = data;
  return (
    <NavLink
      className="flex hover:text-black text-black"
      to={encodeURI(`/blog/${id}/${title}`)}
    >
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-red-400 dark:text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <div className="ml-4">
        {title && (
          <h4 className="text-lg font-medium leading-6 dark:text-gray-50">
            {title}
          </h4>
        )}
        {description && (
          <p className="mt-2 dark:text-gray-400">
            <p dangerouslySetInnerHTML={{ __html: description }} />
          </p>
        )}
      </div>
    </NavLink>
  );
}

export default function ArticleList({ data }) {
  const { t } = useTranslation();
  let tripArticle = [],
    globalArticle = [],
    promoArticle = [],
    articleListSession = [],
    tripLast = {};

  if (data && data.length) {
    tripArticle = getArticleByHashTag(data, HASHTAG.TRIP);
    promoArticle = getArticleByHashTag(data, HASHTAG.PROMOTION);
    globalArticle = getArticleByHashTag(data, HASHTAG.GLOBAL);
    tripLast = tripArticle[0];
    articleListSession = getArticleByHashTag(data, HASHTAG.NEWS);
  }

  return (
    <div>
      <section className="my-8 dark:bg-gray-800 dark:text-gray-100">
        <div className="container flex flex-col items-center p-4 mx-auto space-y-6 md:p-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="w-16 h-16 dark:text-red-400"
          >
            <polygon points="328.375 384 332.073 458.999 256.211 406.28 179.924 459.049 183.625 384 151.586 384 146.064 496 182.756 496 256.169 445.22 329.242 496 365.936 496 360.414 384 328.375 384" />
            <path d="M415.409,154.914l-2.194-48.054L372.7,80.933,346.768,40.414l-48.055-2.2L256,16.093,213.287,38.219l-48.055,2.2L139.3,80.933,98.785,106.86l-2.194,48.054L74.464,197.628l22.127,42.715,2.2,48.053L139.3,314.323l25.928,40.52,48.055,2.195L256,379.164l42.713-22.126,48.055-2.195,25.928-40.52L413.214,288.4l2.195-48.053,22.127-42.715Zm-31.646,76.949L382,270.377l-32.475,20.78-20.78,32.475-38.515,1.76L256,343.125l-34.234-17.733-38.515-1.76-20.78-32.475L130,270.377l-1.759-38.514L110.5,197.628,128.237,163.4,130,124.88,162.471,104.1l20.78-32.474,38.515-1.76L256,52.132l34.234,17.733,38.515,1.76,20.78,32.474L382,124.88l1.759,38.515L401.5,197.628Z" />
          </svg>
          <p className="px-6 py-2 text-2xl font-semibold text-center sm:font-bold sm:text-3xl md:text-4xl lg:max-w-2xl xl:max-w-4xl dark:text-gray-300">
            {t("blogTxt")}
          </p>
        </div>
      </section>

      <div>
        <section className="dark:bg-gray-800 dark:text-gray-100">
          <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
            <NavLink
              to={encodeURI(`/blog/${tripLast.id}/${tripLast.title}`)}
              className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-900"
            >
              {tripLast.image && (
                <img
                  src={tripLast.image}
                  alt=""
                  className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500"
                />
              )}
              <div className="p-6 space-y-2 lg:col-span-5">
                {tripLast.title && (
                  <h3 className="text-2xl font-semibold sm:text-4xl">
                    {tripLast.title}
                  </h3>
                )}
                {tripLast.description && (
                  <p className="pt-3 hover:text-black text-black">
                    <p
                      dangerouslySetInnerHTML={{ __html: tripLast.description }}
                    />
                  </p>
                )}
              </div>
            </NavLink>
            <MultipleRows data={articleListSession} />
          </div>
        </section>
        <section className="dark:bg-gray-800 dark:text-gray-100">
          <div className="container max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-center sm:text-5xl dark:text-gray-50">
                {t("blogCare")}
              </h2>
              <p className="max-w-3xl mx-auto mt-4 text-xl text-center dark:text-gray-400">
                <span className="text-alibus">AliBus</span> – {t("blogPromoTxt")}
              </p>
            </div>
            <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl dark:text-gray-50">
                  {t("promotionsTitle")}
                </h3>
                <p className="mt-3 text-lg dark:text-gray-400">
                  {t("blogPromoTxt1")}
                </p>
                <div className="mt-12 space-y-12">
                  {getFromToOfArray(promoArticle, 0, 3)?.map((promo, idx) => {
                    return <Item key={idx} data={promo} />;
                  })}
                </div>
              </div>
              <div aria-hidden="true" className="mt-10 lg:mt-0">
                <img
                  src="https://source.unsplash.com/random/360x480"
                  className="mx-auto rounded-lg shadow-lg dark:bg-gray-500"
                  alt=""
                />
              </div>
            </div>
            <div>
              <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
                <div className="lg:col-start-2">
                  <h3 className="text-2xl font-bold tracking-tight sm:text-3xl dark:text-gray-50">
                    {t("travelBook")}
                  </h3>
                  <p className="mt-3 text-lg dark:text-gray-400">{t("travelBookTxt1")}</p>
                  <div className="mt-12 space-y-12">
                    {getFromToOfArray(tripArticle, 0, 3)?.map((trip, idx) => {
                      return <Item key={idx} data={trip} />;
                    })}
                  </div>
                </div>
                <div className="mt-10 lg:mt-0 lg:col-start-1 lg:row-start-1">
                  <img
                    src="https://source.unsplash.com/random/361x481"
                    alt=""
                    className="mx-auto rounded-lg shadow-lg dark:bg-gray-500"
                  />
                </div>
              </div>
            </div>
            <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl dark:text-gray-50">
                  {t("travelNews")}
                </h3>
                <p className="mt-3 text-lg dark:text-gray-400">{t("travelNewsTxt1")}</p>
                <div className="mt-12 space-y-12">
                  {getFromToOfArray(globalArticle, 0, 3)?.map((item, idx) => {
                    return <Item key={idx} data={item} />;
                  })}
                </div>
              </div>
              <div aria-hidden="true" className="mt-10 lg:mt-0">
                <img
                  src="https://source.unsplash.com/random/362x482"
                  className="mx-auto rounded-lg shadow-lg dark:bg-gray-500"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
