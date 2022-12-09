import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import TextAndIcon from "../../components/client/cards/TextAndIcon";
import TextAndImage from "../../components/client/cards/TextAndImage";
import TextAndImageOverride from "../../components/client/cards/TextAndImageOverride";
import Hero from "../../components/client/carousels/Hero";
import MultipleItems from "../../components/client/carousels/MultipleItems";
import MultipleItemsScroll from "../../components/client/carousels/MultipleItemsScroll";
import { getArticleByHashTag, getFromToOfArray } from "../../models/GlobalModel";
import { getAllArticle, getAllBanner } from "../../redux/actions/GlobalAction";
import { HASHTAG } from "../../utils/constant";

export default function Homepage() {
  const {articles, bannerList} = useSelector(state => state.GlobalReducer);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  console.log("*******", bannerList)
  useEffect(() => {
    dispatch(getAllBanner());
    dispatch(getAllArticle());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Hero data={getFromToOfArray(bannerList?.filter(i => i.enable), 0, 1)} />
      <div className="container py-10">
        <MultipleItems ComponentItem={TextAndImage} data={getArticleByHashTag(articles, HASHTAG.POPULAR)} title={t("popularTitle")} />
        <MultipleItemsScroll ComponentItem={TextAndImage} data={getArticleByHashTag(articles, HASHTAG.PROMOTION)} title={t("promotionsTitle")} />
        <MultipleItemsScroll ComponentItem={TextAndImage} data={getArticleByHashTag(articles, HASHTAG.OFFERS)} title={t("offersTitle")} />
        <MultipleItems ComponentItem={TextAndImage} data={getArticleByHashTag(articles, HASHTAG.SERVICE)} title={t("servicesTitle")} />
        <MultipleItems ComponentItem={TextAndImage} data={getArticleByHashTag(articles, HASHTAG.OPERATOR_PARTNER)} title={t("partnerTitle")} />
        <MultipleItems ComponentItem={TextAndIcon} data={getArticleByHashTag(articles, HASHTAG.CONNECTION)} title={t("platformTitle")} />
        <MultipleItems ComponentItem={TextAndImageOverride} data={getArticleByHashTag(articles, HASHTAG.STATION)} title={t("stationsTitle")} />
      </div>
    </>
  );
}
