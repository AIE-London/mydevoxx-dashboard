import talk from "../../../main/api/talk";
import wireMockAPI from "./wiremock/wiremockApi";
import talkMapping from "./wiremock/mappings/talk";
import notFound from "./wiremock/mappings/notFoundTalk";
import {UnexpectedErrorException, UnexpectedSuccessException} from "./testingErrors";

/**
 * Set up wiremock with normal room api response
 */
let normalSetup = () => {
    return wireMockAPI.postMapping(talkMapping);
};

/**
 * Set up wiremock with 404 response
 */
let notFoundSetup = () => {
    return wireMockAPI.postMapping(notFound);
};

/**
 * <if> wiremock is trained with a speakers response list -> returns speaker list
 * <else> wiremock is trained with a 404 response -> returns 404
 */
describe('getTalk', () => {
    it('should return talk data and handle a 404', () => {
        return normalSetup().then(talk.getTalk("").then((result) => {
                expect(result).toEqual({
                    id: 'JWG-0522'
                })
            }, (error) => {
                throw new UnexpectedErrorException("Unexpected error when retrieving speakers after \"Normal\" setup", error);
            });
    });
});


test('talk integration tests', () => {

    describe('getTalk', () => {

        it('should get a talk with a valid id', () => {
            return talk.getTalk("JWG-0522").then((result) => {
                expect(result.id).toEqual("JWG-0522");
            }).catch((error) => {
                expect(true).toBe(false);
            })
        });

        it('should get a talk with an invalid id', () => {
            return talk.getTalk("JWG-0523")
                .then((result) => {
                    expect(true).toEqual(false);
                }).catch((error) => {
                    expect(error.name).toEqual("Error");
                });
        });

        it('should throw error when getting a talk with an undefined id', () => {
            return talk.getTalk().then((result) => {
                expect(true).toEqual(false);
            }).catch((error) => {
                console.log("helllo");
                expect(error.name).toEqual("Error");
            });
        });

    });
})
