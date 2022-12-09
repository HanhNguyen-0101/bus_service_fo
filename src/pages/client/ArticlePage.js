/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import ArticleList from "../../components/client/articles/ArticleList";
import ArticleSingle from "../../components/client/articles/ArticleSingle";
import {
  filterArticalByHashTagAndTitle,
  findArticleById,
  getAllArticle,
} from "../../redux/actions/GlobalAction";
import { HASHTAG } from "../../utils/constant";
import { useParams } from "react-router-dom";

export default function ArticlePage() {
  const dispatch = useDispatch();
  const { articles, articleSelected } = useSelector(
    (state) => state.GlobalReducer
  );
  const { articleId, articleTitle } = useParams();
  const articlesData = _.orderBy(articles, ["id"], ["desc"]);

  useEffect(() => {
    if (articleId === "global") {
      dispatch(
        filterArticalByHashTagAndTitle({
          hashtag: HASHTAG.GLOBAL,
          title: articleTitle,
        })
      );
    } else {
      dispatch(findArticleById({ id: articleId }));
    }
    dispatch(getAllArticle());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);

  if (articleId) {
    return (
      <ArticleSingle
        data={articleSelected || {}}
        articleList={articlesData}
      />
    );
  } else {
    return <ArticleList data={articlesData} />;
  }
}
