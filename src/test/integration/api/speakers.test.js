import speakers from "../../../main/api/speakers";
import wireMockAPI from "./wiremock/wiremockApi";
import speakersMapping from "./wiremock/mappings/speakers";
import notFound from "./wiremock/mappings/notFoundSpeakers";
import {UnexpectedErrorException, UnexpectedSuccessException, MappingSetupException} from "./testingErrors";
import {raiseOrPassError, expectNotFoundOrRethrowError} from "./testingHelpers";

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
            .then(speakers.getSpeakers,
                (error) => {
                    raiseOrPassError("MappingSetupException", "Wiremock mapping failed for \"normalSetup\"", error)
                })
            .then((results) => {
                expect(results[0]).toEqual({
                    id: '695b40d928dd0a905b7ab1b900b5a5752870a7d8',
                    name: 'Helen Beal'
                })
            }, (error) => { // Should not error, so throw exception
                raiseOrPassError("UnexpectedErrorException", "Unexpected error when retrieving speakers after \"Normal\" setup", error);
            })
            .then(notFoundSetup) // Setup Mock for 404 response
            .then(speakers.getSpeakers,
                (error) => {
                    raiseOrPassError("MappingSetupException", "Wiremock mapping failed for \"notFoundSetup\"", error);
                })
            .then((results) => { // Should not pass, so throw exception
                raiseOrPassError("UnexpectedSuccessException", "Unexpected success when retrieving speakers after \"Not Found\" setup");
            }, (error) => {
                expectNotFoundOrRethrowError(error, "Unexpected error on \"getSpeakers\" after \"notFoundSetup\"");
            })
            .catch((error) => {
                console.error(error);
                throw error;
            })
    })
});