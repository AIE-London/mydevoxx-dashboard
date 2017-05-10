import request from "then-request";

let UuidEndpoint =
  "https://mydevoxx-capgemini-api-router.eu-gb.mybluemix.net/uuid?email=";
const mockUuidEndpoint = process.env.REACT_APP_WIREMOCK_SERVER + "/uuid?email=";
const uuidRegex = /^[a-zA-Z0-9]+$/;

/**
 * Use mock endpoint outside of live
 */
if (["production", "integration"].indexOf(process.env.NODE_ENV) < 0) {
  UuidEndpoint = mockUuidEndpoint;
}

/**
 * Get the users UUID  for the conference
 * @returns {UUID}
 */
let getUUID = email => {
  return request("GET", UuidEndpoint + email)
    .then(response => {
      // self error handles for non 200 responses
      let body = response.getBody();
      return body.toString();
    })
    .then(uuid => {
      if (!uuidRegex.test(uuid)) {
        throw new Error("Invalid UUID");
      }
      return uuid;
    });
};

export default {
  getUUID
};
