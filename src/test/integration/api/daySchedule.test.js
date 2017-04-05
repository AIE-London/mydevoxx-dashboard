/**
 * Created by SCMORETO on 05/04/2017.
 */

import daySchedule from "../../../main/api/daySchedule";
import wireMockAPI from "../wiremock/wiremock-api";
import dayScheduleMapping from "../wiremock/mappings/daySchedule";
import notFound from "../wiremock/mappings/notFoundDaySchedule";
import emptyArray from "../wiremock/mappings/emptyArrayDaySchedule";

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
            .then(daySchedule.getSlots("thursday"))
            .then((results) => {
                expect(results[0]).toEqual({
                    roomId: 'a_gallery_hall',
                    fromTimeMillis: 1494493200000,
                    talkId: 'JWG-0522',
                    toTimeMillis: 1494494400000,
                    roomName: 'Gallery Hall'
                })
            }, (error) => { // Should not error, so thro expect error below
                throw new UnexpectedErrorException("Unexpected error when retrieving day schedule after \"Normal\" setup", error); // Throw an expect error to differentiate from 404 in the catch
            })
            .then(notFoundSetup) // Setup Mock for 404 response
            .then(daySchedule.getSlots("thursday"))
            .then((results) => {
                throw new UnexpectedSuccessException("Unexpected success when retrieving day schedule after \"Not Found\" setup"); // Should not get here, so fail with expect error
            })
            .catch((error) => {
                if (error.statusCode){ // Failed on negative test - good!
                    expect(error.statusCode).toBe(404);
                } else { // Failed on positive test - bad!
                    console.error(error);
                    throw error;
                }
            });
    });

    /**
     * <if> wiremock trained with empty array response -> returns 404 response
     */
    it('should return a 404 based on an empty array', () => {
        return emptyArraySetup().then(getSlots("thursday")).then((results) => {
            throw new UnexpectedSuccessException("Unexpected success when retrieving day schedule after \"Not Found\" setup");
        }).catch((error) => {
            if(error.statusCode) {
                expect(error.statusCode).toBe(404);
            } else {
                console.error(error);
                throw error;
            }
        });
    });
});