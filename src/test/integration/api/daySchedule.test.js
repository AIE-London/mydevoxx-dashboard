/**
 * Created by SCMORETO on 05/04/2017.
 */

import daySchedule from "../../../main/api/daySchedule";
import wireMockAPI from "./wiremock/wiremockApi";
import dayScheduleMapping from "./wiremock/mappings/daySchedule";
import notFound from "./wiremock/mappings/notFoundDaySchedule";
import emptyArray from "./wiremock/mappings/emptyArrayDaySchedule";
import {UnexpectedErrorException, UnexpectedSuccessException, MappingSetupException} from "./testingErrors";

let isTestingException = (error) =>{
    if (error && error.name && ["UnexpectedErrorException", "UnexpectedSuccessException", "MappingSetupException"].indexOf(error.name) > -1){
        return true;
    } else {
        return false;
    }
}

/**
 * Set up wiremock with normal day schedule api response
 */
let normalSetup = () => {
    return wireMockAPI.postMapping(dayScheduleMapping);
};

/**
 * Set up wiremock with 404 response
 */
let notFoundSetup = () => {
    return wireMockAPI.postMapping(notFound);
};

/**
 * Set up wiremock with empty Array response
 */
let emptyArraySetup = () => {
    return wireMockAPI.postMapping(emptyArray);
};

/**
 * <if> wiremock is trained with a daySched response list -> returns a day schedule array list
 * <else> wiremock is trained with a 404 response -> returns 404
 */
describe('getSlots', () => {
    it('should work return data and handles a 404', () => {
        return normalSetup() // Setup mock for positive test
            .then(() => "thursday")
            .then(daySchedule.getSlots)
            .then((results) => {
                expect(results[0]).toEqual({
                    roomId: 'a_gallery_hall',
                    fromTimeMillis: 1494493200000,
                    talkId: 'JWG-0522',
                    toTimeMillis: 1494494400000,
                    roomName: 'Gallery Hall'
                })
            }, (error) => { // Should not error, so thro expect error below
                if (isTestingException(error)){ // Let it flow down to the catch as-is
                    throw error;
                } else { // Error on the getSlots call for normal setup
                    throw new UnexpectedErrorException("Unexpected error when retrieving day schedule after \"Normal\" setup", error); // Throw an expect error to differentiate from 404 in the catch
                }
            })
            .then(notFoundSetup) // Setup Mock for 404 response
            .then(() =>  "thursday"
                , (error) => {
                if (isTestingException(error)){ // Let it flow down to the catch as-is
                    throw error;
                } else {
                    throw new MappingSetupException("Mapping setup failed for \"notFoundSetup\"", error);
                }
            })
            .then(daySchedule.getSlots)
            .then((results) => {
                throw new UnexpectedSuccessException("Unexpected success when retrieving day schedule after \"Not Found\" setup"); // Should not get here, so fail with expect error
            }, (error) => {
                if (isTestingException(error)){ // Let it flow down to the catch as-is
                    throw error;
                } else {
                    if (error.body && error.body.toString() === "Not Found"){ // Expected error from negative test
                        expect(error.statusCode).toBe(404);
                    } else {
                        throw UnexpectedErrorException("Unexpected error when retrieving day schedule after \"Not Found\" setup", error);
                    }
                }
            })
            .then(emptyArraySetup)
            .then(() => {
                return "thursday"
            }, (error) => {
                if (isTestingException(error)){ // Let it flow down to the catch as-is
                    throw error;
                } else {
                    throw new MappingSetupException("Mapping setup failed for \"emptyArraySetup\"", error);
                }
            })
            .then(daySchedule.getSlots)
            .then((results) => {
                expect(results).toEqual([])
            }, (error) => { // Should not error, so thro expect error below
                if (isTestingException(error)){ // Let it flow down to the catch as-is
                    throw error;
                } else {
                    throw new UnexpectedErrorException("Unexpected error when retrieving day schedule after \"Empty Array\" setup", error); // Throw an expect error to differentiate from 404 in the catch
                }
             })
            .catch((error) => {
                console.error(error);
                throw error;
            })
    });
});