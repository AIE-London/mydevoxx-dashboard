import request from "then-request";

let speakerEndpoint = "https://cfp.devoxx.co.uk/api/conferences/DV17/speakers/";
const mockSpeakerEndpoint =
  "https://aston-wiremock.eu-gb.mybluemix.net/api/conferences/DV17/speakers/";

/**
 * Use mock endpoint outside of live
 */
if (["production", "integration"].indexOf(process.env.NODE_ENV) < 0) {
  speakerEndpoint = mockSpeakerEndpoint;
}

/**
 * Get a speaker by Id
 *
 * @param speakerId
 * @returns {bio, firstName, lastName, avatarUrl, company, twitter, blog, talkId}
 */
let getSpeaker = speakerId => {
  console.debug("[API-CALL] Getting speaker ID");
  return request("GET", speakerEndpoint + speakerId).then(response => {
    let body = JSON.parse(response.getBody());
    return {
      uuid: body.uuid,
      bio: body.bio,
      firstName: body.firstName,
      lastName: body.lastName,
      avatarURL: body.avatarURL,
      company: body.company,
      twitter: body.twitter,
      blog: body.blog,
      acceptedTalkIDs: body.acceptedTalks.map(talk => {
        return talk.id;
      })
    };
  });
};

/**
 * Creates talkId array from speaker api response including talkIds
 *
 * @param talkId
 * @returns {Array}
 */

export default {
  getSpeaker: getSpeaker
};
