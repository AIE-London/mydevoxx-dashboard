import {raiseOrPassError, expectNotFoundOrRethrowError} from "../../../test/integration/api/testingHelpers";
import {
    UnexpectedErrorException,
    UnexpectedSuccessException,
    MappingSetupException
} from "../../../test/integration/api/testingHelpers";
import wiremockAPI from "../../integration/api/wiremock/wiremockApi";
import unexpectedErrorResponse from "../../integration/api/wiremock/mappings/unexpectedErrorResponse.json";
import speaker from "../../../main/api/speaker";

let unexpectedErrorSetup = () => {
    return wiremockAPI.postMapping(unexpectedErrorResponse);
}


it('should report unexpected error thrown on an api call', () => {
    //setup conditions to call test helper method
    return unexpectedErrorSetup()
        .then(() => "error",
            (error) => {
                raiseOrPassError("MappingSetupException", "Wiremock mapping failed for \"notFoundSetup\"", error);
            })
        .then(speaker.getSpeaker, (error) => {
            expect(() => {
                raiseOrPassError("UnexpectedErrorException", "Unexpected error", error)
            }).toThrowError(UnexpectedErrorException)
        });
});

/**
 * test raiseOrPassError
 *
 * set error to not match case in switch
 * catch default case and pass test
 */



