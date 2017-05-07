import talk from "../../../main/api/talk";
import wireMockAPI from "./wiremock/wiremockApi";
import talkMapping from "./wiremock/mappings/talk";
import notFound from "./wiremock/mappings/notFoundTalk";
import {
  UnexpectedErrorException,
  UnexpectedSuccessException,
  MappingSetupException
} from "./testingErrors";
import {
  raiseOrPassError,
  expectNotFoundOrRethrowError
} from "./testingHelpers";

/**
 * Set up wiremock with normal talk api response
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
 * <if> wiremock is trained with a talk response -> returns talk details
 * <else> wiremock is trained with a 404 response -> returns 404
 */
describe("getTalk", () => {
  it("should return talk data", () => {
    return normalSetup()
      .then(
        () => "IBN-5679",
        error => {
          raiseOrPassError(
            "MappingSetupException",
            'Wiremock mapping failed for "normalSetup"',
            error
          );
        }
      )
      .then(talk.getTalk)
      .then(
        result => {
          expect(result).toEqual({
            description: "Talk summary",
            id: "IBN-5679",
            name: "The DevOps Superpattern",
            speakers: [
              {
                id: "695b40d928dd0a905b7ab1b900b5a5752870a7d8",
                name: "Helen Beal"
              }
            ],
            tracks: ["Agile", "DevOps"],
            type: "Conference"
          });
        },
        error => {
          raiseOrPassError(
            "UnexpectedErrorException",
            'Unexpected error on "getTalk" after "normalSetup"',
            error
          );
        }
      )
      .catch(error => {
        console.error(error);
        throw error;
      });
  });

  it("should handle a 404", () => {
    return notFoundSetup()
      .then(
        () => "idonotexist",
        error => {
          raiseOrPassError(
            "MappingSetupException",
            'Wiremock mapping failed for "notFoundSetup"',
            error
          );
        }
      )
      .then(talk.getTalk)
      .then(
        result => {
          raiseOrPassError(
            "UnexpectedSuccessException",
            'Unexpected success on "getTalk" after "notFoundSetup"'
          );
        },
        error => {
          expectNotFoundOrRethrowError(
            error,
            'Unexpected error on "getTalk" after "notFoundSetup"'
          );
        }
      )
      .catch(error => {
        console.error(error);
        throw error;
      });
  });
});
