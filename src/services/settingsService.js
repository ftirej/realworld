import { HTTP_PUT } from "./apiMethods";
import ApiBase from "./apiBase";
import getServiceUrl from "./urlHelper";

class settingsService {
  static updateSettings(dispatch, user) {
    const url = getServiceUrl("user", HTTP_PUT, "updateSettings");

    return ApiBase.doRequest(dispatch, HTTP_PUT, url, true, false, {
      user
    }).then(response => response.json());
  }
}

export default settingsService;
