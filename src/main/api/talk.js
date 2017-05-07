import request from "then-request";

let endpoint = "https://cfp.devoxx.co.uk/api/conferences/DV17/talks/";
const mockEndpoint =
  "https://aston-wiremock.eu-gb.mybluemix.net/api/conferences/DV17/talks/"; // Expect JWG-0522 as talkId

/**
 * Use mock endpoint when not Live
 */
if (["production", "integration"].indexOf(process.env.NODE_ENV) < 0) {
  endpoint = mockEndpoint;
}

/**
 * Take the url from a speaker and return the id
 * @param url
 * @returns {string} id
 * @throws InvalidURLException
 */
let getSpeakerIdFromUrl = url => {
  let result = "";

  if (url) {
    result = url.slice(url.lastIndexOf("/") + 1).trim();
  } else {
    throw new InvalidURLException();
  }
  return result;
};

/**
 * Takes a comma delimited string and turns it into an array of individual "tracks"
 * If no tracks are provided - we return an empty array.
 * @param tracks
 * @returns {Array} tracks
 */
let parseTracks = tracks => {
  let result = [];
  if (tracks) {
    result = tracks.split(",").map(item => {
      return item.trim().replace("&amp;", "&");
    });
  }
  return result;
};

/**
 * Takes the speaker object returned and formats it to the way we'd like it
 * @param speakers
 * @returns {Array} speakers
 */
let parseSpeakers = speakers => {
  return speakers.map(speakerObj => {
    return {
      id: getSpeakerIdFromUrl(speakerObj.link.href),
      name: speakerObj.name
    };
  });
};

/**
 * Get a talk by it's Id
 * @param talkId
 * @returns (Object) {id, name, description, tracks[track], speakers[{id, name}])
 */
let getTalk = talkId => {
  /*endpoint + talkId*/
  return request("GET", endpoint + talkId).then(response => {
    let body = JSON.parse(response.getBody());
    return {
      id: body.id,
      type: body.talkType,
      name: body.title,
      description: body.summary,
      tracks: parseTracks(body.track),
      speakers: parseSpeakers(body.speakers)
    };
  });
};

/**
 * InvalidURLException
 * For when a invalid URL is given
 */
function InvalidURLException(message) {
  this.name = "InvalidURLException";
  this.message = message || "Invalid URL Provided";
}

InvalidURLException.prototype = Error.prototype;

export default {
  getTalk: getTalk,
  parseTracks: parseTracks,
  parseSpeakers: parseSpeakers,
  getSpeakerIdFromUrl: getSpeakerIdFromUrl
};
