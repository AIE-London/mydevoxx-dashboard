import speaker from "../../../main/api/speaker";
import wiremockAPI from "./wiremock/wiremockApi";
import speakerMapping from "./wiremock/mappings/speaker"
import notFound from "./wiremock/mappings/notFoundSpeaker.json";
import {UnexpectedErrorException, UnexpectedSuccessException, MappingSetupException} from "./testingErrors";
import {raiseOrPassError, expectNotFoundOrRethrowError} from "./testingHelpers";

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

describe('getSpeaker', () => {
    it('should return speaker data', () =>{
        return normalSetup()
            .then(() => "695b40d928dd0a905b7ab1b900b5a5752870a7d8",
                (error) => {
                    raiseOrPassError("MappingSetupException", "Wiremock mapping failed for \"normalSetup\"", error)
                })
            .then(speaker.getSpeaker)
            .then((result) => {
                expect(result).toEqual(
                    {
                        uuid: '695b40d928dd0a905b7ab1b900b5a5752870a7d8',
                        firstName: 'Helen',
                        lastName: 'Beal',
                        avatarURL: 'https://media.licdn.com/media/p/2/000/10f/320/3b9da1f.jpg',
                        company: 'Ranger4',
                        twitter: '@helenranger4',
                        blog: 'www.ranger4.com',
                        talkId: ["IBN-5679"]
                    }
                )
            }, (error) => {
                raiseOrPassError("UnexpectedErrorException", "Unexpected error on \"getSpeaker\" after \"normalSetup\"", error);
            })
            .catch((error) => {
                console.error(error);
                throw error;
            })
    });

    it("handles a 404", () => {
        return notFoundSetup()
            .then(() => "idonotexist",
                (error) => {
                    raiseOrPassError("MappingSetupException", "Wiremock mapping failed for \"notFoundSetup\"", error);
                })
            .then(speaker.getSpeaker)
            .then((result) => {
                console.log("RESULT");
                console.log(result);
                raiseOrPassError("UnexpectedSuccessException", "Unexpected success on \"getSpeaker\" after \"notFoundSetup\"");
            }, (error) => {
                expectNotFoundOrRethrowError(error, "Unexpected error on \"getSpeaker\" after \"notFoundSetup\"");
            })
            .catch((error) => {
                console.error(error);
                throw error;
            })
    });
});