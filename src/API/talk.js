let endpoint = "http://cfp.devoxx.co.uk/api/conferences/DV17/talks/";

/**
 * Use a mocked endpoint
 */
if (process.env.NODE_ENV != "production"){
    console.log("Not in production, using mocked endpoint");
    endpoint = "https://aston-wiremock.eu-gb.mybluemix.net/api/conferences/DV17/talks/"; // Only works with talkId JWG-0522
}

/**
 * Get a talk by it's Id
 * @param talkId
 * @returns (Object) {id, name, description, tracks[track], speakers[{id, name}])
 */
let getTalk = (talkId) => {
    fetch(endpoint + talkId, {
        method: 'GET'
    }).then((response) => {
        let body = JSON.parse(response.body);

        return {
            id: body.id,
            name: body.title,
            description: body.summary,
            tracks: parseTracks(body.track),
            speakers: parseSpeakers(body.speakers)
        };

    }).catch((error) => {
        return {error: error};
    })
};

/**
 * Takes a comma delimited string and turns it into an array of individual "tracks"
 * @param tracks
 * @returns {Array} tracks
 */
let parseTracks = (tracks) => {
    return tracks.split(",").map((item) => {return item.trim()});
};

/**
 * Takes the speaker object returned and formats it to the way we'd like it
 * @param speakers
 * @returns {Array} speakers
 */
let parseSpeakers = (speakers) -> {
    return speakers.map((speakerObj) => {
        return {
            id: getSpeakerIdFromUrl(speakerObj.link.href),
            name: speakerObj.name
        };
    });
};

/**
 * Take the url from a speaker and return the id
 * @param url
 * @returns {string} id
 */
let getSpeakerIdFromUrl = (url) => {
    return url.slice(url.lastIndexOf("/") + 1).trim();
};

module.exports = {
    getTalk: getTalk
};