/**
 * Created by SCMORETO on 27/04/2017.
 */

import favoredTalks from "../../../main/api/favoredTalks";
import {UnexpectedErrorException, UnexpectedSuccessException, MappingSetupException} from "./testingErrors";
import {raiseOrPassError, expectNotFoundOrRethrowError} from "./testingHelpers";


describe('getFavoredTalks', () => {
    it('should return the favored talks for user DanC', () => {
        return favoredTalks.getFavoredTalks("26667c9fdcc603ee93b43fb3e780b07378695a86")
            .then((result) => {
                expect(result).toEqual(
                    {"favored":[{"id":"MXR-2678"}]}
                )
            }, (error) => {
                raiseOrPassError("UnexpectedErrorException", "Unexpected error on \"getFavoredTalks\" ", error);
            })
            .catch((error) => {
                console.error(error);
                throw error;
            })
    });

});
