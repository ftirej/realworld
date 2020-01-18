import * as types from "./actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_GLOBAL_ARTICLE_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.GET_GLOBAL_ARTICLE_ERROR:
      return {
        ...state,
        isFetching: false,
        message: action.message
      };
    case types.GET_GLOBAL_ARTICLE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        articles: action.articles,
        articlesCount: action.articlesCount
      };
    case types.SET_PAGE_SUCCESS:
      return {
        ...state,
        currentPage: action.currentPage
      };
    case types.FIND_ARTICLE_REQUEST:
      return {
        ...state,
        isFinding: true,
        errorFinding: false
      };
    case types.FIND_ARTICLE_SUCCESS:
      return {
        ...state,
        isFinding: false,
        errorFinding: false,
        slugArticle: action.article
      };
    case types.FIND_ARTICLE_ERROR:
      return {
        ...state,
        errorFinding: true,
        errorMessage: action.message
      };
    case types.GET_COMMENTS_LIST_REQUEST:
      return {
        ...state,
        isFindingComments: true
      };
    case types.GET_COMMENTS_LIST_SUCCESS:
      return {
        ...state,
        isFindingComments: false,
        comments: action.comments
      };
    case types.GET_COMMENTS_LIST_ERROR:
      return {
        ...state,
        isFindingComments: false
      };
    case types.POST_COMMENT_REQUEST:
      return {
        ...state,
        isPostingComment: true
      };
    case types.POST_COMMENT_SUCCESS:
      return {
        ...state,
        isPostingComment: false,
        comment: action.comment
      };
    case types.POST_COMMENT_ERROR:
      return {
        ...state,
        isPostingComment: false
      };
    case types.POST_ARTICLE_REQUEST:
      return {
        ...state,
        isPostingArticle: true
      };
    case types.POST_ARTICLE_SUCCESS:
      return {
        ...state,
        isPostingArticle: false,
        article: action.article
      };
    case types.POST_ARTICLE_ERROR:
      return {
        ...state,
        isPostingArticle: false
      };
    default:
      return state;
  }
};

export default reducer;
