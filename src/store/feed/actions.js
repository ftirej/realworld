import * as types from "./actionTypes";
import axios from "../../axios-base";

export const getGlobalArticleRequest = () => {
  return {
    type: types.GET_GLOBAL_ARTICLE_REQUEST
  };
};

export const getGlobalArticleSuccess = data => {
  return {
    type: types.GET_GLOBAL_ARTICLE_SUCCESS,
    articles: data.articles,
    articlesCount: data.articlesCount
  };
};

export const getGlobalArticleError = message => {
  return {
    type: types.GET_GLOBAL_ARTICLE_ERROR,
    message
  };
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;

export const getGlobalFeed = page => {
  return dispatch => {
    dispatch(getGlobalArticleRequest());
    axios
      .get(`/articles?${limit(10, page)}`)
      .then(response => {
        dispatch(getGlobalArticleSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
        dispatch(getGlobalArticleError(error.message, 0));
      });
  };
};

export const getYourFeed = page => {
  return dispatch => {
    dispatch(getGlobalArticleRequest());
    axios
      .get(`/articles/feed?${limit(10, page)}`)
      .then(response => {
        dispatch(getGlobalArticleSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
        dispatch(getGlobalArticleError(error.message, 0));
      });
  };
};

export const setPageRequest = () => {
  return {
    type: types.SET_PAGE_REQUEST
  };
};

export const setPageSuccess = currentPage => {
  return {
    type: types.SET_PAGE_SUCCESS,
    currentPage
  };
};

export const setPageError = () => {
  return {
    type: types.SET_PAGE_ERROR
  };
};

export const setPage = page => {
  return dispatch => {
    dispatch(setPageRequest());
    dispatch(setPageSuccess(page));
    dispatch(getGlobalFeed(page));
  };
};
