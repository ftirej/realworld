import { t } from "react-i18nify";
//import fetch from "isomorphic-fetch";
import queryString from "query-string";
import * as endpoints from "./apiendPoints";
import ServiceActions from "../store/services/actions";
import ServiceError from "./serviceError";
import { LOCAL_STORAGE_JWT } from "../helpers/constants";
import * as localStorageHelper from "../helpers/localStorageHelper";

const BEARER = "Token";
const PLATFORM_CLIENT_TYPE = "1";

class ApiBase {
  /**
   * Method that will parse to json the body if possible
   * @param dispatch
   * @param response
   * @returns {Promise.<TResult>}
   */
  static parseBody(response) {
    return new Promise(resolve => {
      response.json().then(json => {
        resolve(json);
      });
    }).catch(resolve => {});
  }

  static parseJSON(response) {
    return new Promise(resolve =>
      response.json().then(json =>
        resolve({
          status: response.status,
          ok: response.ok,
          json
        })
      )
    );
  }

  /**
   * Base method to call an API endpoint. You only need to pass the required parameters and will reply the response accordingly.
   * @param dispatch
   * @param method
   * @param url
   * @param requireAuth
   * @param params
   * @param body
   * @returns {Promise.<T>|*}
   */
  static doRequest(
    dispatch,
    method,
    url,
    requireAuth = false,
    params = false,
    body = null,
    useFullUrl = false,
    addClientTypeAndVersion = true
  ) {
    const serviceActions = new ServiceActions();
    const isFormData = body && body.constructor.name === "FormData";
    let commonHeaders = {};

    if (requireAuth) {
      commonHeaders = {
        AUTHORIZATION: `${BEARER} ${localStorageHelper.getItem(
          LOCAL_STORAGE_JWT
        )}`,
        ...(addClientTypeAndVersion && { ClientType: PLATFORM_CLIENT_TYPE }),
        ...(addClientTypeAndVersion && {
          ClientVersion: process.env.REACT_APP_VERSION
        })
      };
    }

    const headers = isFormData
      ? { ...commonHeaders }
      : {
          ...commonHeaders,
          "Content-Type": "application/json"
        };

    let options = {
      method: method,
      headers: new Headers(headers)
    };

    if (body) {
      options = {
        ...options,
        body: isFormData ? body : JSON.stringify(body)
      };
    }

    let fullUrl = useFullUrl ? url : `${endpoints.BASE_URL}${url}`;
    if (params) {
      const queryStrParams = queryString.stringify(params, {
        arrayFormat: "none"
      });
      fullUrl = fullUrl.concat(`?${queryStrParams}`);
    }

    const request = new Request(fullUrl, options);

    return fetch(request)
      .then(response => {
        switch (response.status) {
          case 500: {
            const serviceError = new ServiceError(
              500,
              t("error.500"),
              method,
              url,
              fullUrl,
              requireAuth
            );
            dispatch(serviceActions.handleServiceError(serviceError));
            return Promise.reject(serviceError);
          }
          case 401: {
            // Unauthorized
            const serviceError = new ServiceError(
              401,
              t("error.401"),
              method,
              url,
              fullUrl,
              requireAuth
            );
            //this.parseBody(response).then(json => {
            // If 401 then body of fetch response is empty and is not readable
            // serviceError.setPayload(json);
            dispatch(serviceActions.handleServiceError(serviceError));
            return Promise.reject(serviceError);
            //});
          }
          default: {
            break;
          }
        }

        // Status in not the range <200 to 299>
        if (!response.ok) {
          const serviceError = new ServiceError(
            response.status,
            response.statusText,
            method,
            url,
            fullUrl,
            requireAuth
          );
          return this.parseBody(response).then(json => {
            serviceError.setPayload(json);
            dispatch(serviceActions.handleServiceError(serviceError));
            return Promise.reject(serviceError);
          });
        }

        return response;
      })
      .catch(error => {
        throw error;
      });
  }
}

export default ApiBase;
