import speaker from "../../../main/api/speaker";
import wiremockAPI from "./wiremock/wiremock-api";
import speakerMapping from "./wiremock/mappings/speaker"
import notFound from "./wiremock/mappings/notFoundSpeaker.json";
import {UnexpectedErrorException, UnexpectedSuccessException} from "./testingErrors";

/**
 * Set up wiremock with normal speaker api response
 */
let normalSetup = () => {
    return wiremockAPI.postMapping(speakerMapping);
};

/**
 * Set up wiremock with 404 response
 */
let notFoundSetup = () => {
    return wiremockAPI.postMapping(notFound);
};

/**
 * <if> wiremock is trained with a speaker response list -> returns speaker details
 * <else> wiremock is trained with a 404 response -> returns 404
 */
describe('getSpeaker', () => {
    it('should return speaker data and handle a 404', () => {
        return normalSetup().then(() => {
            return "695b40d928dd0a905b7ab1b900b5a5752870a7d8";
        }).then(speaker.getSpeaker)
            .then((result) => {
                expect(result).toEqual({
                    uuid: '695b40d928dd0a905b7ab1b900b5a5752870a7d8',
                    firstName: 'Helen',
                    lastName: 'Beal',
                    avatarUrl: 'https://media.licdn.com/media/p/2/000/10f/320/3b9da1f.jpg',
                    company: 'Ranger4',
                    twitter: '@helenranger4',
                    blog: 'www.ranger4.com',
                    track: 'Methodology & Culture'
                })
            }, (error) => {
                throw new UnexpectedErrorException("Unexpected error when retrieving speaker after \"Normal\" setup", error);
            }).then(notFoundSetup).then(() => {
                return "BB2";
            }).then(speaker.getSpeaker).then((result) => {
                throw new UnexpectedSuccessException("Unexpected success when retrieving speaker after \"Not Found\" setup");
            }).catch((error) => {
                if (error.statusCode) {
                    expect(error.statusCode).toEqual(404);
                } else {
                    console.error(error);
                    throw error;
                }
            });
    });
});