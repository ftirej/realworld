import { HTTP_GET, HTTP_POST } from "./apiMethods";
import ApiBase from "./apiBase";
import getServiceUrl from "./urlHelper";

class feedService {
  static getGlobalFeed(dispatch, limit, offset) {
    const url = getServiceUrl("articles", HTTP_GET, "globalFeed");

    return ApiBase.doRequest(
      dispatch,
      HTTP_GET,
      url,
      true,
      { limit, offset },
      false,
      false
    ).then(response => response.json());
  }

  static getYourFeed(dispatch, limit, offset) {
    const url = getServiceUrl("articles", HTTP_GET, "yourFeed");

    return ApiBase.doRequest(
      dispatch,
      HTTP_GET,
      url,
      true,
      { limit, offset },
      false,
      false
    ).then(response => response.json());
  }

  static getCommentList(dispatch, slugId) {
    const url = getServiceUrl("articles", HTTP_GET, "comments", { slugId });

    return ApiBase.doRequest(
      dispatch,
      HTTP_GET,
      url,
      true,
      false,
      false,
      false
    ).then(response => response.json());
  }

  static postCommentList(dispatch, slugId, comment) {
    const url = getServiceUrl("articles", HTTP_POST, "comment", { slugId });

    return ApiBase.doRequest(
      dispatch,
      HTTP_POST,
      url,
      true,
      false,
      comment
    ).then(response => response.json());
  }

  static findArticle(dispatch, slugId, comment) {
    const url = getServiceUrl("articles", HTTP_GET, "findArticle", { slugId });

    return ApiBase.doRequest(
      dispatch,
      HTTP_GET,
      url,
      true,
      false,
      comment
    ).then(response => response.json());
  }

  static postArticle(dispatch, article) {
    const url = getServiceUrl("articles", HTTP_POST, "article");

    return ApiBase.doRequest(
      dispatch,
      HTTP_POST,
      url,
      true,
      false,
      article
    ).then(response => response.json());
  }
}

export default feedService;
