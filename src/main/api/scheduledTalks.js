/**
 * Created by SCMORETO on 26/04/2017.
 */

/**
 * Created by SCMORETO on 19/04/2017.
 */
import request from 'then-request';

let ScheduledTalksEndpoint = "";
const mockUuidEndpoint = "https://aston-wiremock.eu-gb.mybluemix.net/";

/**
 * Use mock endpoint outside of live
 */
if (["production", "integration"].indexOf(process.env.NODE_ENV) < 0) {
    ScheduledTalksEndpoint = mockUuidEndpoint;
}

/**
 * Get the users Scheduled Talks for the conference
 * @Params uuid
 * @returns {UUID}
 */
let getScheduledTalks = (uuid) => {
    return request('GET', ScheduledTalksEndpoint + uuid + '/scheduled').then((response) => {
        let body = response.getBody();
        return JSON.parse(body);
    });
};

export default {
    getScheduledTalks
};