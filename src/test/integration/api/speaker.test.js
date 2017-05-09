import speaker from "../../../main/api/speaker";
import wiremockAPI from "./wiremock/wiremockApi";
import speakerMapping from "./wiremock/mappings/speaker";
import notFound from "./wiremock/mappings/notFoundSpeaker.json";
import {
  UnexpectedErrorException,
  UnexpectedSuccessException,
  MappingSetupException
} from "./testingErrors";
import {
  raiseOrPassError,
  expectNotFoundOrRethrowError
} from "./testingHelpers";
import debugLog from "../../../main/utils/debugLog";

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

describe("getSpeaker", () => {
  it("should return speaker data", () => {
    return speaker
      .getSpeaker("695b40d928dd0a905b7ab1b900b5a5752870a7d8")
      .then(
        result => {
          expect(result).toEqual({
            uuid: "695b40d928dd0a905b7ab1b900b5a5752870a7d8",
            firstName: "Helen",
            bio: "Helen has 20 years’ experience working in the technology industry with a focus on the Software Development Lifecycle for a wealth of cross industry clients in the UK and abroad. Helen is passionate about DevOps and is the creator of the Ranger4 DevOps LiftOff Workshop and the Ranger4 DevOps Maturity Assessment - winner of the IBM Beacon Award 2015 for Outstanding DevOps Solution. She also started Ranger4’s #DevOpsFriday5 initiative and is on the Board of Regents at the DevOps Institute (Ranger4 are also a Registered Education Provider for the DOI’s DevOps training courses). Helen is also a novelist and ecologist. She once saw a flamingo lay an egg.",
            lastName: "Beal",
            avatarURL: "https://media.licdn.com/media/p/2/000/10f/320/3b9da1f.jpg",
            company: "Ranger4",
            twitter: "@helenranger4",
            blog: "www.ranger4.com",
            acceptedTalkIDs: ["IBN-5679"]
          });
        },
        error => {
          raiseOrPassError(
            "UnexpectedErrorException",
            'Unexpected error on "getSpeaker" after "normalSetup"',
            error
          );
        }
      )
      .catch(error => {
        console.error(error);
        throw error;
      });
  });

  it("handles a 404", () => {
    return speaker
      .getSpeaker("695b40d928dd0a905b7ab1b900b5a5752870a7d8404")
      .then(
        result => {
          debugLog.log("RESULT");
          debugLog.log(result);
          raiseOrPassError(
            "UnexpectedSuccessException",
            'Unexpected success on "getSpeaker" after "notFoundSetup"'
          );
        },
        error => {
          expectNotFoundOrRethrowError(
            error,
            'Unexpected error on "getSpeaker" after "notFoundSetup"'
          );
        }
      )
      .catch(error => {
        console.error(error);
        throw error;
      });
  });
});
