/**
 * Created by dan on 25/04/2017.
 */


jest.mock('then-request', () => {
  let responder = require('http-response-object');
  return jest.fn(() => {
    return new Promise(resolve => {
      resolve(new responder(404, {'Content-Type': 'application/json'}, new Buffer(JSON.stringify({ reason: "Not Found" })), 'http://example.com'))})
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
      expect(!result);
    }, (error) => {
      expect(error.statusCode).toBe(404);
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