import room from "../../../main/api/rooms";
import wiremockAPI from "./wiremock/wiremockApi";
import roomMapping from "./wiremock/mappings/rooms"
import notFound from "./wiremock/mappings/notFoundRooms.json";
import {UnexpectedErrorException, UnexpectedSuccessException} from "./testingErrors";

/**
 * Set up wiremock with normal room api response
 */
let normalSetup = () => {
    return wiremockAPI.postMapping(roomMapping);
};

/**
 * Set up wiremock with 404 response
 */
let notFoundSetup = () => {
    return wiremockAPI.postMapping(notFound);
};

/**
 * <if> wiremock is trained with a room response list -> returns room list
 * <else> wiremock is trained with a 404 response -> returns 404
 */
describe('getRooms', () => {
    it('should return room data and handle a 404', () => {
        return normalSetup().then(room.getRooms).then((result) => {
            expect(result[0]).toEqual({
                id: 'a_gallery_hall',
                name: 'Gallery Hall',
                capacity: 1500,
                setup: 'special',
                recorded: undefined
            })
        }, (error) => {
            throw new UnexpectedErrorException("Unexpected error when retrieving speakers after \"Normal\" setup", error);
        }).then(notFoundSetup).then(room.getRooms).then((result) => {
            throw new UnexpectedSuccessException("Unexpected success when retrieving speakers after \"Not Found\" setup");
        }).catch((error) => {
            if (error.statusCode) {
                expect(error.statusCode).toBe(404);
            } else {
                console.error(error);
                throw error;
            }
        });
    });
});


