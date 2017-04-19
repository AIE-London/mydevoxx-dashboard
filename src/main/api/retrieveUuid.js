/**
 * Created by SCMORETO on 19/04/2017.
 */
import request from 'then-request';

//import userEmail from......


let UuidEndpoint = "http://cfp.devoxx.co.uk/uuid?email=";
const mockUuidEndpoint = "https://aston-wiremock.eu-gb.mybluemix.net/uuid?email=dan.cotton@capgemini.com";

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
let getUUID = () => {
    return request('GET', UuidEndpoint).then((response) => {

        let body = JSON.parse(response.getBody());

       // return body;
        return {
        body
        }
    });
};
