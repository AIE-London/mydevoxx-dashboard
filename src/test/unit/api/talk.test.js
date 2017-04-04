import talk from "../../../main/api/talk";

describe('parseTracks', () => {

    it('should parse a comma delimited list of tracks', () => {
        expect(talk.parseTracks("track1, track2")).toEqual(['track1','track2']);
    });

    it('should parse a comma delimited list of tracks even when there is only one', () => {
        expect(talk.parseTracks("Java Language")).toEqual(['Java Language']);
    });

    it('should parse a comma delimited list of tracks even when there is no tracks sent', () => {
        expect(talk.parseTracks()).toEqual([]);
    });

});

describe('parseSpeakers', () => {

    it('should return a re-formatted array of speakers', () => {
        expect(talk.parseSpeakers([{
            link: {
                href: "http://cfp.devoxx.co.uk/api/conferences/DV17/speakers/8a7d68a8a2b09105c969cbae7b37019d4fa470a5",
                rel: "http://cfp.devoxx.co.uk/api/profile/speaker",
                title: "Mark Reinhold"
            },
            name: 'Mark Reinhold'
        }])).toEqual([{
            id: '8a7d68a8a2b09105c969cbae7b37019d4fa470a5',
            name: 'Mark Reinhold'
        }])
    });

    it('should return an empty array', () => {
        expect(talk.parseSpeakers([])).toEqual([]);
    });

});

describe('getSpeakerIdFromUrl', () => {

    it('should get string after last /', () => {
        expect(talk.getSpeakerIdFromUrl('/first/second/third')).toEqual('third');
    });

    it('should throw an InvalidURLException if no url sent', () => {
        try {
            talk.getSpeakerIdFromUrl();
            expect(true).toEqual(false);
        } catch (error){
            expect(error.name).toEqual('InvalidURLException');
        }
    });

});