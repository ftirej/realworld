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
    axios
      .get(`/articles/${slugId}/comments`)
      .then(response => {
        dispatch(getCommentsListSuccess(response.data.comments));
      })
      .catch(error => {
        console.log(error);
        dispatch(getCommentsListError(error.message));
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
    axios
      .post(`/articles/${slugId}/comments`, comment)
      .then(response => {
        dispatch(postCommentSuccess(response.data.comment));
        dispatch(getCommentList(slugId));
      })
      .catch(error => {
        console.log(error);
        dispatch(postCommentError(error.message));
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
    axios
      .get(`articles/${slugId}`)
      .then(response => {
        dispatch(findArticleSuccess(response.data));
      })
      .catch(error => {
        dispatch(findArticleError(error.message));
      });
  };
};
