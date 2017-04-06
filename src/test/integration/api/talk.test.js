import talk from "../../../main/api/talk";
import wireMockAPI from "./wiremock/wiremockApi";
import talkMapping from "./wiremock/mappings/talk";
import notFound from "./wiremock/mappings/notFoundTalk";
import {UnexpectedErrorException, UnexpectedSuccessException} from "./testingErrors";

/**
 * Set up wiremock with normal talk api response
 */
let normalSetup = () => {
    return wireMockAPI.postMapping(talkMapping);
};

/**
 * Set up wiremock with 404 response
 */
let notFoundSetup = () => {
    return wireMockAPI.postMapping(notFound);
};

/**
 * <if> wiremock is trained with a talk response -> returns talk details
 * <else> wiremock is trained with a 404 response -> returns 404
 */
describe('getTalk', () => {
    it('should return talk data and handle a 404', () => {
        return normalSetup().then(() => {
            return "IBN-5679";
        }).then(talk.getTalk).then((result) => {
            expect(result).toEqual({
                id: 'IBN-5679'
            })
        }, (error) => {
            throw new UnexpectedErrorException("Unexpected error when retrieving talk after \"Normal\" setup", error);
        }).then(notFoundSetup).then(() => {
            return "BB8";
        }).then(talk.getTalk).then((result) => {
            throw new UnexpectedSuccessException("Unexpected success when retrieving talk after \"Not Found\" setup");
        }).catch((error) => {
            if (error.statusCode) {
                expect(error.statusCode).toEqual(404);
            } else {
                console.error(error);
                throw error;
            }
        });
    });
});