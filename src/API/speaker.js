import request from 'then-request';

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
 * @returns {bio, firstName, lastName, avatarUrl, company, twitter, blog,
 *          acceptedTalks[acceptedTalks], links, talkType, track[track], talkId, talkTitle}
 */
let getSpeaker = (speakerId) => {
    return request('GET', speakerEndpoint + speakerId).then((response) => {
        let body = JSON.parse(response.getBody());
        return {
            bio: body.bio,
            firstName: body.firstName,
            lastName: body.lastName,
            avatarUrl: body.avatarUrl,
            company: body.company,
            twitter: body.twitter,
            blog: body.blog,
            acceptedTalks: body.acceptedTalks,
            links: body.acceptedTalks.links,
            talkType: body.talkType,
            track: parseTrack(body.acceptedTalks.track),
            talkId: body.talkId,
            talkTitle: body.talkTitle
        };
    });
};

/**
 * Creates track array from String of tracks
 *
 * @param track
 * @returns {Array}
 */
let parseTrack = (tracks) => {
    let result = [];
    if (tracks) {
        result = tracks.split(",").map((item) => {return item.trim()});
    }
    return result;
};

export default {
    getSpeaker: getSpeaker,
    parseTrack: parseTrack
};