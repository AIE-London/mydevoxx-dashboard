/**
 * Created by SCMORETO on 19/04/2017.
 */

import scheduledTalks from "../../../main/api/scheduledTalks";
import {UnexpectedErrorException, UnexpectedSuccessException, MappingSetupException} from "./testingErrors";
import {raiseOrPassError, expectNotFoundOrRethrowError} from "./testingHelpers";


describe('getScheduledTalks', () => {
    it('should return the scheduled talks for user DanC', () => {
        return scheduledTalks.getScheduledTalks("26667c9fdcc603ee93b43fb3e780b07378695a86")
            .then((result) => {
                expect(result).toEqual(
                    {"scheduled":[{"id":"MXR-2678"}]}
                )
            }, (error) => {
                raiseOrPassError("UnexpectedErrorException", "Unexpected error on \"getScheduledTalks\" ", error);
            })
            .catch((error) => {
                console.error(error);
                throw error;
            })
    });

});

