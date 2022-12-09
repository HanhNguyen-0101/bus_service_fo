import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TextAndImage from "../../components/client/cards/TextAndImage";
import TextAndImageHorizontal from "../../components/client/cards/TextAndImageHorizontal";
import MultipleItemsScroll from "../../components/client/carousels/MultipleItemsScroll";
import SearchForm from "../../components/client/forms/SearchForm";
import Breadcrumb from "../../components/global/Breadcrumb";
import { getArticleByHashTag } from "../../models/GlobalModel";
import { getAllArticle } from "../../redux/actions/GlobalAction";
import {
  findVehicleFollowTripDate,
  sortTripBus,
} from "../../redux/actions/VehicleAction";
import { HASHTAG } from "../../utils/constant";
import { removeAccents } from "../../utils/stringFunc";

export default function SearchPage() {
  const [sort, setSort] = useState(null);
  const { articles } = useSelector((state) => state.GlobalReducer);
  const { locationSelected } = useSelector((state) => state.SearchReducer);
  const { tripBusList } = useSelector((state) => state.VehicleReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { content } = useParams();
  useEffect(() => {
    dispatch(getAllArticle());
    if (content) {
      const { from, to, date } = locationSelected;
      if (from && to) {
        const url = `from=${removeAccents(
          from.name?.replace(/ /g, "_")?.toLowerCase()
        )}&&to=${removeAccents(
          to.name?.replace(/ /g, "_")?.toLowerCase()
        )}&&date=${date ? moment(date).format("DD-MM-YYYY") : ""}`;
        if (content !== url) {
          window.location.href = url;
        }
        dispatch(findVehicleFollowTripDate(from.id, to.id, date));
      } else {
        window.location.href = "/your-trip";
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);
  let breadcrumb = [{ id: 1, name: t("busTicket"), link: "/" }];
  if (locationSelected.from && locationSelected.to && content) {
    breadcrumb.push({
      id: 2,
      name: t("busFromTo", {
        from: locationSelected.from.name,
        to: locationSelected.to.name,
      }),
      link: content,
    });
  }

  const renderTripBus = () => {
    return tripBusList?.map((i, idx) => {
      return <TextAndImageHorizontal key={idx} data={i} />;
    });
  };

  const handleSort = (sortBy, sortType = "desc") => {
    dispatch(sortTripBus(sortBy, sortType));
  };
  const sortFields = [
    {
      id: 1,
      title: t("earliestTime"),
      fuct: () => handleSort("tripAt", "asc"),
    },
    { id: 2, title: t("latestTime"), fuct: () => handleSort("tripAt") },
    { id: 3, title: t("lowestPrice"), fuct: () => handleSort("price") },
    { id: 4, title: t("highestPrice"), fuct: () => handleSort("price", "asc") },
  ];
  const renderSort = () => {
    return sortFields?.map((i, idx) => {
      return (
        <li className="nav-item py-1.5 border-t sm:py-0 sm:border-t-0" key={idx}>
          <button
            className={`hover:outline-none focus:outline-none focus:text-alibus focus:font-medium focus:underline ${
              i.id === sort ? "text-alibus font-medium underline" : ""
            }`}
            onClick={() => {
              setSort(i.id);
              i.fuct();
            }}
          >
            <span className="text-sm focus:text-alibus hover:text-alibus">
              {i.title}
            </span>
          </button>
        </li>
      );
    });
  };
  return (
    <div className="container">
      <Breadcrumb data={breadcrumb} />
      <div className="w-full m-auto border">
        <SearchForm hasValue={content} />
      </div>
      {!content?.trim() && (
        <div className="py-16 text-center max-w-5xl m-auto">
          <h3 className="text-2xl font-medium">
            {t("noResult_0")}
            <br />
            {t("noResult_1")}
          </h3>
          <p className="py-6">{t("noResult_2")}</p>
        </div>
      )}
      {content?.trim() && (
        <>
          <h3 className="text-xl md:text-3xl font-medium pb-4 pt-10 text-center max-w-6xl m-auto">
            {t("result", {
              from: locationSelected?.from?.name,
              to: locationSelected?.to?.name,
              length: tripBusList?.length,
            })}
          </h3>
          {tripBusList && tripBusList.length && (
            <>
              <div className="sort flex justify-between pt-4">
                <nav className="navbar navbar-expand-sm navbar-light w-full p-0">
                  <button
                    className="inline-block sm:hidden text-base text-black hover:text-alibus focus:text-alibus py-2 focus:outline-none border-0"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapsibleNavId"
                    aria-controls="collapsibleNavId"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="font-medium inline-block sm:hidden">{t("sort")}</span>
                    {" "}<i className="fa fa-sort"></i></button>
                  <span className="font-medium hidden sm:block">{t("sortBy")}:</span>
                  <div
                    className="collapse navbar-collapse"
                    id="collapsibleNavId"
                  >
                    <ul className="navbar-nav sm:grid sm:grid-cols-4 w-full sm:text-center">
                      {renderSort()}
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="lines">{renderTripBus()}</div>
            </>
          )}
        </>
      )}
      <div className="mb-10">
        <MultipleItemsScroll
          ComponentItem={TextAndImage}
          data={getArticleByHashTag(articles, HASHTAG.PROMOTION)}
          title={t("promotionsTitle")}
        />
      </div>
    </div>
  );
}
