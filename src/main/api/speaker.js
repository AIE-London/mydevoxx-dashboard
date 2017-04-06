import request from 'then-request';

let speakerEndpoint = "http://cfp.devoxx.co.uk/api/conferences/DV17/speakers/";
const mockSpeakerEndpoint = "https://aston-wiremock.eu-gb.mybluemix.net/api/conferences/DV17/speakers/";

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
let getSpeaker = (speakerId) => {
    return request('GET', speakerEndpoint + speakerId).then((response) => {
        let body = JSON.parse(response.getBody());
        return {
            uuid: body.uuid,
            firstName: body.firstName,
            lastName: body.lastName,
            avatarURL: body.avatarURL,
            acceptedTalks: body.acceptedTalks,
            company: body.company,
            twitter: body.twitter,
            blog: body.blog,
            talkId: parseTalkId(body.acceptedTalks.id)
        };
    });
};

/**
 * Creates talkId array from speaker api response including talkIds
 *
 * @param talkId
 * @returns {Array}
 */
let parseTalkId = (talkId) => {
    let result = [];
    if (talkId) {
        result = talkId.split(",").map((item) => {
            return item.trim()
        });
    }
    return result;
};

export default {
    getSpeaker: getSpeaker,
    parseTalkId: parseTalkId
};