import * as endpoints from "./apiendPoints";

/**
 * Gets a service urls by params
 *
 * @param {string} entity
 * @param {string} requestType
 * @param {string} endPointName
 * @param {object} params
 *
 * @returns {string} url
 */
export default function getServiceUrl(
  entity,
  requestType,
  endPointName,
  params
) {
  let url =
    endpoints.urlPattern[entity][requestType.toLowerCase()][endPointName];
  url = url.replace(/{([^}]+)}/g, (_, group) => {
    return params[group];
  });

  return url;
}
