import request from 'then-request';

let roomEndpoint = "http://cfp.devoxx.co.uk/api/conferences/DV17/rooms/";
const mockRoomEndpoint = "https://aston-wiremock.eu-gb.mybluemix.net/api/conferences/DV17/rooms/";

/**
 * Use mock endpoint outside of live
 */
if (["production", "integration"].indexOf(process.env.NODE_ENV) < 0) {
    roomEndpoint = mockRoomEndpoint;
}

/**
 * Get array of rooms available at the conference
 *
 * @returns {Array}
 */
let getRooms = () => {
  return request('GET', roomEndpoint).then((response) => {
      let body = JSON.parse(response.body);

      return body.map((item) => {
          return {
              id: item.rooms[0].id,
              name: item.rooms[0].name,
              capacity: item.rooms[0].capacity,
              setup: item.rooms[0].setup,
              recorded: item.rooms[0].recorded
          }
      });
  });
};

