import room from "../../../main/api/rooms";
import wiremockAPI from "./wiremock/wiremockApi";
import roomMapping from "./wiremock/mappings/rooms"

import {UnexpectedErrorException} from "./testingErrors";

/**
 * Set up wiremock with normal room api response
 */
let normalSetup = () => {
  return wiremockAPI.postMapping(roomMapping);
};

/**
 * Wiremock is trained with a room response list, api
 * should returns room list post transformation.
 */
describe('getRooms from external', () => {
  it('should return room data from external mock', () => {
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
    });
  });
});


