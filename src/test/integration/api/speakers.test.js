/**
 * Created by SCMORETO on 30/03/2017.
 */

import speakers from "../../../main/api/speakers";


describe('getSpeakers', () => {

    it('should return a re-formatted array of speakers names and UUID', () => {
        return speakers.getSpeakers().then(function (speakers) {

            expect(speakers).toEqual([{
                id: '695b40d928dd0a905b7ab1b900b5a5752870a7d8',
                name: 'Helen Beal'
            }])

        })


    });

});