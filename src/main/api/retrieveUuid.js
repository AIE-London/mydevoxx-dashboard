/**
 * Created by SCMORETO on 19/04/2017.
 */
import request from 'then-request';

let UuidEndpoint = "http://cfp.devoxx.co.uk/uuid?email=";
const mockUuidEndpoint = "https://aston-wiremock.eu-gb.mybluemix.net/uuid?email=";

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
let getUUID = (email) => {
    return request('GET', UuidEndpoint + email).then((response) => {
        let body = response.getBody();

       // return body;
        return body.toString();
    });
};

export default {
    getUUID
};