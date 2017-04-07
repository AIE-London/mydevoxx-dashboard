import schedules from "../../../main/api/schedules";
import wireMockAPI from "./wiremock/wiremockApi";
import schedulesMapping from "./wiremock/mappings/schedules";
import notFoundMapping from "./wiremock/mappings/notFoundSchedules"

import {UnexpectedErrorException, UnexpectedSuccessException, MappingSetupException} from "./testingErrors";
import {raiseOrPassError, expectNotFoundOrRethrowError} from "./testingHelpers";

let normalSetup = () => {
    return wireMockAPI.postMapping(schedulesMapping);
};

let notFoundSetup = () => {
    return wireMockAPI.postMapping(notFoundMapping)
};

describe("getSchedules", () => {
    it ("should return data and handle a 404",  () => {
        return normalSetup()
            .then(schedules.getSchedules,
                (error) => {
                    raiseOrPassError("MappingSetupException", "Wiremock mapping failed for \"normalSetup\"", error)
                })
            .then((results) => {
                expect(results[0]).toBe("thursday");
                expect(results[1]).toBe("friday");
            }, (error) => {
                raiseOrPassError("UnexpectedErrorException", "Unexpected error when retrieving schedules after \"Normal\" setup", error);
            })
            .then(notFoundSetup)
            .then(schedules.getSchedules,
                (error) => {
                    raiseOrPassError("MappingSetupException", "Wiremock mapping failed for \"notFoundSetup\"", error);
                })
            .then((result) => {
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
