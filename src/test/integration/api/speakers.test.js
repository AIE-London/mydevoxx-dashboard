import speakers from "../../../main/api/speakers";
import wireMockAPI from "./wiremock/wiremock-api";
import speakersMapping from "./wiremock/mappings/speakers";
import notFound from "./wiremock/mappings/notFoundSpeakers";

/**
 * Set up wiremock with normal room api response
 */
let normalSetup = () => {
    return wireMockAPI.postMapping(speakersMapping);
};

/**
 * Set up wiremock with 404 response
 */
let notFoundSetup = () => {
    return wireMockAPI.postMapping(notFound);
};

/**
 * <if> wiremock is trained with a speakers response list -> returns speaker list
 * <else> wiremock is trained with a 404 response -> returns 404
 */
describe('getSpeakers', () => {
    it('should work return data and handles a 404', () => {
        return normalSetup() // Setup mock for positive test
            .then(speakers.getSpeakers)
            .then((results) => {
                expect(results[0]).toEqual({
                    id: '695b40d928dd0a905b7ab1b900b5a5752870a7d8',
                    name: 'Helen Beal'
                })
            }, (error) => { // Should not error, so thro expect error below
                expect(true).toBe(false); // Throw an expect error to differentiate from 404 in the catch
            })
            .then(notFoundSetup) // Setup Mock for 404 response
            .then(speakers.getSpeakers)
            .then((results) => {
                expect(true).toBe(false); // Should not get here, so fair with expect error
            })
            .catch((error) => {
                if (error.statusCode){ // Failed on negative test - good!
                    expect(error.statusCode).toBe(404);
                } else { // Failed on positive test - bad!
                    expect(true).toBe(false);
                }
            })
    })
});