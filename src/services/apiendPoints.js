export const BASE_URL = process.env.REACT_APP_API_HOST;
export const USERS = "users";
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
      globalFeed: `${ARTICLES}/{limit}`,
      yourFeed: `${ARTICLES}/feed/{limit}`,
      comments: `${ARTICLES}/{slugId}/comments`
    },
    put: {},
    post: {
      comment: `${ARTICLES}/{slugId}/comments`,
      article: `${ARTICLES}`
    },
    delete: {}
  }
};
