import speaker from "../../../main/api/speaker";

test('speaker integration test', () => {
    describe('parseTrack', () => {

        it('should parse a comma delimited list of tracks', () => {
            expect(speaker.parseTrack("track1, track2")).toEqual(['track1','track2']);
        });

        it('should parse a comma delimited list of tracks even when there is only one', () => {
            expect(speaker.parseTrack("Java Language")).toEqual(['Java Language']);
        });

        it('should parse a comma delimited list of tracks even when there is no tracks sent', () => {
            expect(speaker.parseTrack()).toEqual([]);
        });
    });
});
