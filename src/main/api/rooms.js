import request from "then-request";

let roomEndpoint = "https://cfp.devoxx.co.uk/api/conferences/DV17/rooms/";
const mockRoomEndpoint =
  process.env.WIREMOCK_SERVER + "/api/conferences/DV17/rooms/";

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
  return request("GET", roomEndpoint).then(response => {
    let body = JSON.parse(response.getBody());

    var roomMappingResult = body.rooms.map(item => {
      return {
        id: item.id,
        name: item.name,
        capacity: item.capacity,
        setup: item.setup,
        recorded: item.recorded
      };
    });

    return roomMappingResult;
  });
};

export default {
  getRooms: getRooms
};
