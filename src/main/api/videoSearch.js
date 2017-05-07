/**
 * Created by dan on 07/05/2017.
 */
import request from "then-request";

let host = "mydevoxx-capgemini-api-router.eu-gb.mybluemix.net";
const mockHost = "aston-wiremock.eu-gb.mybluemix.net";

/**
 * Use mock endpoint outside of live
 */
if (["production", "integration"].indexOf(process.env.NODE_ENV) < 0) {
  host = mockHost;
}

/**
 * Takes a 'kind' and an ID and returns a URL
 */
export const getUrl = kindIdObject => {
  if (kindIdObject.kind === "playlist") {
    return "https://youtube.com/playlist?list=" + kindIdObject.id;
  } else if (kindIdObject.kind === "video") {
    return "https://youtube.com/watch?v=" + kindIdObject.id;
  } else {
    return "https://youtube.com/";
  }
};

/**
 * Gets kind/id from youtube api result
 * @returns {Object}
 */
export const getKindId = result => {
  if (result.id.kind === "youtube#playlist") {
    return {
      id: result.id.playlistId,
      kind: "playlist"
    };
  } else if (result.id.kind === "youtube#video") {
    return {
      id: result.id.videoId,
      kind: "video"
    };
  } else {
    return {};
  }
};

/**
 * Get video results from devoxx youtube channel given a track
 * @returns {Object}
 */
export const getVideos = track => {
  return request(
    "GET",
    "https://" + host + "/videos/topic/" + track
  ).then(response => {
    let body = JSON.parse(response.getBody());
    return body.items.map(result => {
      let kindIdObj = getKindId(result);
      return Object.assign({}, kindIdObj, {
        title: result.snippet.title,
        description: result.snippet.description,
        imageUrl: result.snippet.thumbnails.default.url,
        link: getUrl(kindIdObj)
      });
    });
  });
};
