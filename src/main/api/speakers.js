/**
 * Created by SCMORETO on 30/03/2017.
 */
import request from "then-request";

let endpoint = "https://cfp.devoxx.co.uk/api/conferences/DV17/speakers/";
const mockEndpoint =
  process.env.WIREMOCK_SERVER + "/api/conferences/DV17/speakers/";

if (["production", "integration"].indexOf(process.env.NODE_ENV) < 0) {
  endpoint = mockEndpoint;
}

/**
 * GET a reformatted array of all speakers at the conference
 * @returns (Array) {)
 */
let getSpeakers = () => {
  return request("GET", endpoint).then(response => {
    let body = JSON.parse(response.getBody());
    var result = body.map(function(item) {
      return {
        id: item.uuid,
        name: item.links[0].title
      };
    });

    return result;
  });
};

export default {
  getSpeakers: getSpeakers
};
