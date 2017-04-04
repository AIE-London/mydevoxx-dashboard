import room from "../../../main/api/room";
import wiremockAPI from "./wiremock/wiremock-api";
import roomMapping from "./wiremock/mappings/room"
import notFound from "./wiremock/mappings/404";

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
        return normalSetup().then(room.getRoom).then((result) => {
            expect(result[0]).toEqual({
                name: "Room 8",
                id: "room8",
                recorded: true,
                setup: "theatre",
                capacity: "745"
            })
        }, (error) => {
            expect(true).toBe(false);
        }).then(notFoundSetup).then(room.getRoom).then((result) => {
            expect(true).toBe(false);
        }).catch((error) => {
            if (error.statusCode) {
                expect(error.statusCode).toBe(404);
            } else {
                expect(true).toBe(false);
            }
        });
    });
});


