import { HTTP_POST } from "./apiMethods";
import ApiBase from "./apiBase";
import getServiceUrl from "./urlHelper";

class UserService {
  static userLogin(dispatch, email, password) {
    const url = getServiceUrl("users", HTTP_POST, "userLogin");

    return ApiBase.doRequest(dispatch, HTTP_POST, url, false, false, {
      user: {
        email,
        password
      }
    }).then(response => response.json());
  }

  static userSignup(dispatch, username, email, password) {
    const url = getServiceUrl("users", HTTP_POST, "userSignup");

    return ApiBase.doRequest(dispatch, HTTP_POST, url, false, false, {
      user: {
        username,
        password,
        email
      }
    }).then(response => response.json());
  }
}

export default UserService;
