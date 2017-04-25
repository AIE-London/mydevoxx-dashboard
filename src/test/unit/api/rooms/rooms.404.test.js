/**
 * Created by dan on 25/04/2017.
 *
 * Setup in-process mock.
 */
jest.mock('then-request', () => {
  let responder = require('http-response-object');
  return jest.fn(() => {
    return new Promise(resolve => {
      resolve(new responder(404, {'Content-Type': 'application/json'}, new Buffer(JSON.stringify({ reason: "Not Found" })), 'http://example.com'))})
  });
});
// Import API module now we've mocked then-request
import room from "../../../../main/api/rooms";

/**
 * Returns room-list by calling then-request. Then-request
 * will respond with a HTTP Response Object with a
 * pre-defined payload. As the response from the mock is
 * not successful, we should throw an appropriate error for
 * the calling process to catch.
 */
describe('getRooms from in-process', () => {
  it('should handle 404 case using in-process mock, throw appropriate error', () => {

    let apiCall = room.getRooms();

    return apiCall.then((result) => {
      expect(!result);
    }, (error) => {
      expect(error.statusCode).toBe(404);
    });
  });
});