/**
 * Created by dan on 25/04/2017.
 *
 * Setup in-process mock.
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
// Import API module now we've mocked then-request
import room from "../../../../main/api/rooms";

/**
 * Returns room-list by calling then-request. Then-request
 * will respond with a HTTP Response Object with a
 * pre-defined payload. This payload should be transformed
 * and the promise should be resolved with its updated value
 */
describe('getRooms from in-process', () => {
  it('should return room data using in-process mock', () => {
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
  });
});