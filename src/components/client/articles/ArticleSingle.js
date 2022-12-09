import { Avatar } from "antd";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticleByHashTag,
  getFromToOfArray,
} from "../../../models/GlobalModel";
import { HASHTAG } from "../../../utils/constant";
import MultipleRows from "../carousels/MultipleRows";
import { getAllHashtag } from "./../../../redux/actions/GlobalAction";
export default function ArticleSingle({ data, articleList }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { hashtagList } = useSelector((state) => state.GlobalReducer);
  useEffect(() => {
    dispatch(getAllHashtag());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (data.id) {
    const { title, updatedAt, image, description, content, hashtag } = data;
    const hashtagObj = hashtag?.map(i => hashtagList.find(j => j.id === i));
    const relatedPost =
      getArticleByHashTag(articleList, hashtagObj ? hashtagObj[0].name : "") ||
      [];
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
              {title}
            </p>
            <div className="text-base">
              {hashtagObj?.map((h, idx) => {
                return (
                  <span
                    key={idx}
                    className="underline px-2 rounded-sm lowercase font-medium"
                  >
                    #{h.name}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="container items-center max-w-6xl px-6 mx-auto flex justify-start space-x-3">
            <Avatar shape="square" size={64} src="/favicon.png" />
            <div>
              <p className="font-medium py-0.5">AliBus Vietnam</p>
              <p className="text-sm py-0.5 text-gray-400">
                {t("lastUpdated")}{" "}
                {updatedAt ? moment(updatedAt).format("DD/MM/YYYY") : ""}
              </p>
            </div>
          </div>
        </section>

        <div>
          <section className="dark:bg-gray-800 dark:text-gray-100">
            <div className="container max-w-6xl p-6 pt-0 mx-auto space-y-6 sm:space-y-12">
              {description && (
                <h3 className="text-lg font-semibold italic my-4">
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </h3>
              )}
              <img
                src={image}
                alt={image}
                className="object-cover m-auto rounded lg:col-span-7 bg-gray-500"
              />
              <div className="space-y-2">
                <h4 className="text-xl font-semibold">{t("relatedPost")}</h4>
                {relatedPost && relatedPost.length && (
                  <ul className="ml-4 space-y-1 list-disc">
                    {getFromToOfArray(relatedPost, 0, 5)?.map((a, idx) => {
                      return (
                        <li key={idx}>
                          <NavLink
                            className="hover:underline hover:text-alibus"
                            to={encodeURI(`/blog/${a.id}/${a.title}`)}
                          >
                            {a.title}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              {content && (
                <div className="grid justify-center gap-6">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              )}
            </div>
          </section>
          <section className="container max-w-6xl p-6 pt-0 mx-auto mb-6">
            <MultipleRows
              data={getArticleByHashTag(articleList, HASHTAG.NEWS)}
              title={t("mayBeYourLike")}
            />
          </section>
        </div>
      </div>
    );
  } else {
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
              {t("noPost")}
            </p>
          </div>
        </section>
        <section className="container max-w-6xl p-6 pt-0 mx-auto mb-6">
          <MultipleRows
            data={getArticleByHashTag(articleList, HASHTAG.NEWS)}
            title={t("mayBeYourLike")}
          />
        </section>
      </div>
    );
  }
}
