import * as types from "./actionTypes";
import { redirectTo } from "../common/actions";
import feedService from "../../services/feedService";

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

const limitPage = (limit, p) => {
  let offset = p ? p * limit : 0;
  return { limit, offset };
};

export const getGlobalFeed = page => {
  return dispatch => {
    dispatch(getGlobalArticleRequest());
    const { limit, offset } = limitPage(10, page);
    feedService
      .getGlobalFeed(dispatch, limit, offset)
      .then(response => {
        dispatch(getGlobalArticleSuccess(response));
      })
      .catch(error => {
        const message =
          error && error.payload ? error.payload : "Unknown Error";
        dispatch(getGlobalArticleError(message));
      });
  };
};

export const getYourFeed = page => {
  return dispatch => {
    dispatch(getGlobalArticleRequest());
    const { limit, offset } = limitPage(10, page);
    feedService
      .getYourFeed(dispatch, limit, offset)
      .then(response => {
        dispatch(getGlobalArticleSuccess(response));
      })
      .catch(error => {
        const message =
          error && error.payload ? error.payload : "Unknown Error";
        dispatch(getGlobalArticleError(message));
      });
  };
};

export const getCommentsListRequest = () => {
  return {
    type: types.GET_COMMENTS_LIST_REQUEST
  };
};

export const getCommentsListSuccess = comments => {
  return {
    type: types.GET_COMMENTS_LIST_SUCCESS,
    comments
  };
};

export const getCommentsListError = message => {
  return {
    type: types.GET_COMMENTS_LIST_ERROR,
    message
  };
};

export const getCommentList = slugId => {
  return dispatch => {
    dispatch(getCommentsListRequest());
    feedService
      .getCommentList(dispatch, slugId)
      .then(response => {
        dispatch(getCommentsListSuccess(response.comments));
      })
      .catch(error => {
        const message =
          error && error.payload ? error.payload : "Unknown Error";
        dispatch(getCommentsListError(message));
      });
  };
};

export const postCommentRequest = () => {
  return {
    type: types.POST_COMMENT_REQUEST
  };
};

export const postCommentSuccess = comment => {
  return {
    type: types.POST_COMMENT_SUCCESS,
    comment
  };
};

export const postCommentError = message => {
  return {
    type: types.POST_COMMENT_ERROR,
    message
  };
};

export const postCommentList = (slugId, comment) => {
  return dispatch => {
    dispatch(postCommentRequest());
    feedService
      .postCommentList(dispatch, slugId, comment)
      .then(response => {
        dispatch(postCommentSuccess(response.comment));
        dispatch(getCommentList(slugId));
      })
      .catch(error => {
        const message =
          error && error.payload ? error.payload : "Unknown Error";
        dispatch(postCommentError(message));
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

export const findArticleRequest = () => {
  return {
    type: types.FIND_ARTICLE_REQUEST
  };
};

export const findArticleSuccess = data => {
  return {
    type: types.FIND_ARTICLE_SUCCESS,
    article: data.article
  };
};

export const findArticleError = message => {
  return {
    type: types.FIND_ARTICLE_ERROR,
    message
  };
};

export const findArticle = slugId => {
  return dispatch => {
    dispatch(findArticleRequest());
    feedService
      .findArticle(dispatch, slugId)
      .then(response => {
        dispatch(findArticleSuccess(response));
      })
      .catch(error => {
        const message =
          error && error.payload ? error.payload : "Unknown Error";
        dispatch(findArticleError(message));
      });
  };
};

export const postArticleRequest = () => {
  return {
    type: types.POST_ARTICLE_REQUEST
  };
};

export const postArticleSuccess = data => {
  return {
    type: types.POST_ARTICLE_SUCCESS,
    article: data.article
  };
};

export const postArticleError = message => {
  return {
    type: types.POST_ARTICLE_ERROR,
    message
  };
};

export const postArticle = article => {
  return dispatch => {
    dispatch(postArticleRequest());
    feedService
      .postArticle(dispatch, article)
      .then(response => {
        dispatch(postArticleSuccess(response.article));
        dispatch(redirectTo("/"));
      })
      .catch(error => {
        const message =
          error && error.payload ? error.payload : "Unknown Error";
        dispatch(postArticleError(message));
      });
  };
};
