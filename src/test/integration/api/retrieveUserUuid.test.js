/**
 * Created by SCMORETO on 19/04/2017.
 */

import retrieveUuid from "../../../main/api/retrieveUuid";
import {UnexpectedErrorException, UnexpectedSuccessException, MappingSetupException} from "./testingErrors";
import {raiseOrPassError, expectNotFoundOrRethrowError} from "./testingHelpers";


describe('getUUID', () => {
    it('should return a UUID for user DanC', () => {
        return retrieveUuid.getUUID("dan.cotton@capgemini.com")
                .then((result) => {
                expect(result).toEqual(
                    '26667c9fdcc603ee93b43fb3e780b07378695a86'
                )
            }, (error) => {
                raiseOrPassError("UnexpectedErrorException", "Unexpected error on \"getUUID\" after \"normalSetup\"", error);
            })
            .catch((error) => {
                console.error(error);
                throw error;
            })
    });

    it('should return a UUID for user ScottM', () => {
        return retrieveUuid.getUUID("scott.moreton@capgemini.com")
            .then((result) => {
                expect(result).toEqual(
                    '695b40d928dd0a905b7ab1b900b5a5752870a7d8'
                )
            }, (error) => {
                raiseOrPassError("UnexpectedErrorException", "Unexpected error on \"getUUID\" after \"normalSetup\"", error);
            })
            .catch((error) => {
                console.error(error);
                throw error;
            })
    });

});

