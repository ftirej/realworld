export const BASE_URL = process.env.REACT_APP_API_HOST;
export const USERS = "users";
export const USER = "user";
export const ARTICLES = "articles";

export const urlPattern = {
  users: {
    get: {},
    put: {},
    post: {
      userLogin: `${USERS}/login`,
      userSignup: `${USERS}`
    },
    delete: {}
  },
  articles: {
    get: {
      globalFeed: `${ARTICLES}`,
      yourFeed: `${ARTICLES}/feed`,
      comments: `${ARTICLES}/{slugId}/comments`,
      findArticle: `${ARTICLES}/{slugId}`
    },
    put: {},
    post: {
      comment: `${ARTICLES}/{slugId}/comments`,
      article: `${ARTICLES}`
    },
    delete: {}
  },
  user: {
    get: {},
    put: {
      updateSettings: `${USER}`
    },
    post: {},
    delete: {}
  }
};
