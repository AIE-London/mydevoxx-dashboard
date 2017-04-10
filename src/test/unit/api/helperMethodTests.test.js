import {raiseOrPassError, expectNotFoundOrRethrowError} from "../../../test/integration/api/testingHelpers";
import wiremockAPI from "../../integration/api/wiremock/wiremockApi";
import unexpectedErrorResponse from "../../integration/api/wiremock/mappings/unexpectedErrorResponse.json";
import speaker from "../../../main/api/speaker";

let unexpectedErrorSetup = () => {
    return wiremockAPI.postMapping(unexpectedErrorResponse);
}

/**
 * test expectNotFoundOrRethrowError
 *
 * set exception to pass if isATestingException && isAnExpectFailure
 * set status code != 404
 *
 * result UnexpectedErrorException is thrown
 * catch thrown exception and pass test
 */
it('should report unexpected error thrown on an api call', () => {
    //setup conditions to call test helper method
    return unexpectedErrorSetup()
        .then(() => "error",
            (error) => {
                raiseOrPassError("MappingSetupException", "Wiremock mapping failed for \"notFoundSetup\"", error);
            })
        .then(speaker.getSpeaker)
        .catch((error) => {
            expect(error.statusCode).toBe(400);
            expectNotFoundOrRethrowError(error, "Unexpected error");
        });
});

/**
 * test raiseOrPassError
 *
 * set error to not match case in switch
 * catch default case and pass test
 */



