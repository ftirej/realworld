export default {
  articles: [],
  articlesCount: 0,
  currentPage: 0,
  article: {
    slug: null,
    title: null,
    description: null,
    body: null,
    tagList: null,
    createdAt: null,
    updatedAt: null,
    favorited: false,
    favoritesCount: 0,
    author: {
      username: null,
      bio: null,
      image: null,
      following: false
    }
  },
  isFinding: false,
  errorFinding: false
};
