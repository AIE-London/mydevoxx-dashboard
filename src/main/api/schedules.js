import request from "then-request";

let schedulesEndpoint =
  "http://cfp.devoxx.co.uk/api/conferences/DV17/schedules/";
const mockSchedulesEndpoint =
  "https://aston-wiremock.eu-gb.mybluemix.net/api/conferences/DV17/schedules/";

/**
 * Use mock endpoint outside of live
 */
if (["production", "integration"].indexOf(process.env.NODE_ENV) < 0) {
  schedulesEndpoint = mockSchedulesEndpoint;
}

/**
 * Get array of days for the conference
 * @returns {Array}
 */
let getSchedules = () => {
  return request("GET", schedulesEndpoint).then(response => {
    let body = JSON.parse(response.getBody());

    var daysResults = body.links.map(item => {
      return getDayFromUrl(item.href);
    });

    return daysResults;
  });
};

let getDayFromUrl = url => {
  let result = "";

  if (url) {
    result = url.slice(url.lastIndexOf("/") + 1).trim();
  } else {
    throw new InvalidURLException();
  }
  return result;
};

export default {
  getSchedules: getSchedules
};
