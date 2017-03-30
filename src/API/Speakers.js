/**
 * Created by SCMORETO on 30/03/2017.
 */

const endpoint = "http://cfp.devoxx.co.uk/api/conferences/DV17/speakers";

/**
 * GET an array of all speakers at the conference
 * @returns (Array) {)
 */
let getSpeakers = () => {
    fetch(endpoint, {
        method: 'GET'
    }).then((response) => {
        let body = JSON.parse(response.body);

        return body.map(function(item){
            return {id: item.uuid, name: item.links[0].title};
        })

    }).catch((error) => {
        return {error: error};
    })
};