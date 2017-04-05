import room from "../../../main/api/rooms";
import wiremockAPI from "./wiremock/wiremockApi";
import roomMapping from "./wiremock/mappings/rooms"
import notFound from "./wiremock/mappings/notFoundRooms.json";

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
            expect(true).toBe(false);
        }).then(notFoundSetup).then(room.getRooms).then((result) => {
            expect(true).toBe(false);
        }).catch((error) => {
            console.log(error);
            if (error.statusCode) {
                expect(error.statusCode).toBe(404);
            } else {
                expect(true).toBe(false);
            }
        });
    });
});


