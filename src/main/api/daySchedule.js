/**
 * Created by SCMORETO on 05/04/2017.
 */
import request from 'then-request';

let endpoint = "http://http://cfp.devoxx.co.uk/api/conferences/DV17/schedules/"; //Needs day of the week to return an array of slots for all rooms for a day
const mockEndpoint = "https://aston-wiremock.eu-gb.mybluemix.net/api/conferences/DV17/schedules/"; // Expect thursday as params

/**
 * Use mock endpoint when not Live
 */
if ( ["production", "integration"].indexOf(process.env.NODE_ENV) < 0){
    endpoint = mockEndpoint;
}

/**
 * Get slots for rooms by day
 * @param roomId, day
 * @returns (Array) [{roomId, fromTimeMillis, talkId, toTimeMillis, roomName]})
 */
let getSlots = (day) => {
    /*endpoint + day*/
    console.log("DAY: " + endpoint + day);

    return request('GET', endpoint + day).then((response) => {

        let body = JSON.parse(response.getBody());

        let result =  body.slots.map((item) => {
            if (item.talk){
                return {
                    roomId: item.roomId,
                    fromTimeMillis: item.fromTimeMillis,
                    talkId: item.talk.id,
                    toTimeMillis: item.toTimeMillis,
                    roomName: item.roomName
                };
            }
        });
        return result;
    });
};


export default {
    getSlots: getSlots
};