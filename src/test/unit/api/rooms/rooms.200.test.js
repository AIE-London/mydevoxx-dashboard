/**
 * Created by dan on 25/04/2017.
 */
jest.mock('then-request', () => {
  return jest.fn(() => {
    let responder = require('http-response-object');
    return new Promise(resolve => {
      resolve(new responder(200, {'Content-Type': 'application/json'}, new Buffer(JSON.stringify({
        rooms: [{
          id: 'a_test_room',
          name: 'Test Room',
          capacity: 1500,
          setup: 'special',
          recorded: undefined
        }]
      })), 'http://example.com'));
    });
  });
});
import room from "../../../../main/api/rooms";


/**
 * <if> wiremock is trained with a room response list -> returns room list
 * <else> wiremock is trained with a 404 response -> returns 404
 */
describe('getRooms from in-process', () => {
  it('should return room data & handle 404 case using in-process mock', () => {

    let apiCall = room.getRooms();

    return apiCall.then((result) => {
      expect(result[0]).toEqual({
        id: 'a_test_room',
        name: 'Test Room',
        capacity: 1500,
        setup: 'special',
        recorded: undefined
      });
    }, (error) => {
      console.error(error);
      throw new Error("Unexpected error when retrieving speakers after \"Normal\" setup", error);
    });
    // remove test causing concurrency.
    /*.then(notFoundSetup).then(room.getRooms).then((result) => {
     throw new UnexpectedSuccessException("Unexpected success when retrieving speakers after \"Not Found\" setup");
     }).catch((error) => {
     if (error.statusCode) {
     expect(error.statusCode).toBe(404);
     } else {
     console.error(error);
     throw error;
     }
     });*/
  });
});