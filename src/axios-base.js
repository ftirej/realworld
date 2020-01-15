import axios from "axios";
import * as localStorageHelper from "./helpers/localStorageHelper";
import { LOCAL_STORAGE_JWT } from "./helpers/constants";

const BEARER = "Bearer";

const instance = axios.create({
  baseURL: "https://conduit.productionready.io/api/"
});

instance.interceptors.request.use(req => {
  if (localStorageHelper.getItem(LOCAL_STORAGE_JWT)) {
    req.headers.authorization = `${BEARER} ${localStorageHelper.getItem(
      LOCAL_STORAGE_JWT
    )}`;
  }
  return req;
});

export default instance;
