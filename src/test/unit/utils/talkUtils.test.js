/**
 * Created by dan on 07/05/2017.
 */
import Talk from "../../../main/model/talk";
import { getTopTracks, getTimeForTalk } from "../../../main/utils/talkUtils";

test("Should return top 2 tracks if only 2 available - in order of count", () => {
  let talksArray = [
    new Talk(
      "TALK-112",
      "Welcome to Devoxx",
      ["track1", "track2"],
      "en",
      "This is a talk about devoxx",
      ["123ABC"],
      "http://video.youtube.com"
    ),
    new Talk(
      "TALK-112",
      "Welcome to Devoxx",
      ["track2"],
      "en",
      "This is a talk about devoxx",
      ["123ABC"],
      "http://video.youtube.com"
    )
  ];
  expect(getTopTracks(talksArray)).toEqual([
    { name: "track2", count: 2 },
    { name: "track1", count: 1 }
  ]);
});

test("Should return top 3 tracks if 4 available - in order of count", () => {
  let talksArray = [
    new Talk(
      "TALK-112",
      "Welcome to Devoxx",
      ["track1", "track2", "track3", "track4"],
      "en",
      "This is a talk about devoxx",
      ["123ABC"],
      "http://video.youtube.com"
    ),
    new Talk(
      "TALK-112",
      "Welcome to Devoxx",
      ["track2", "track3", "track4"],
      "en",
      "This is a talk about devoxx",
      ["123ABC"],
      "http://video.youtube.com"
    ),
    new Talk(
      "TALK-112",
      "Welcome to Devoxx",
      ["track3"],
      "en",
      "This is a talk about devoxx",
      ["123ABC"],
      "http://video.youtube.com"
    ),
    new Talk(
      "TALK-112",
      "Welcome to Devoxx",
      ["track2"],
      "en",
      "This is a talk about devoxx",
      ["123ABC"],
      "http://video.youtube.com"
    ),
    new Talk(
      "TALK-112",
      "Welcome to Devoxx",
      ["track2"],
      "en",
      "This is a talk about devoxx",
      ["123ABC"],
      "http://video.youtube.com"
    )
  ];
  expect(getTopTracks(talksArray)).toEqual([
    { name: "track2", count: 4 },
    { name: "track3", count: 3 },
    { name: "track4", count: 2 }
  ]);
});

test("should return correct time for Conference talk type", () => {
  let sample = {
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
  };
  expect(getTimeForTalk(sample)).toEqual(50);
});

test("should return correct time for Quickie Sessions talk type", () => {
  let sample = {
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
    type: "Quickie Sessions"
  };
  expect(getTimeForTalk(sample)).toEqual(15);
});

test("should return correct time for Opening Keynote talk type", () => {
  let sample = {
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
    type: "Opening Keynote"
  };
  expect(getTimeForTalk(sample)).toEqual(20);
});

test("should return correct time for Closing Keynote talk type", () => {
  let sample = {
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
    type: "Closing Keynote"
  };
  expect(getTimeForTalk(sample)).toEqual(45);
});

test("should return correct time for Hands-On Labs talk type", () => {
  let sample = {
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
    type: "Hands-on Labs"
  };
  expect(getTimeForTalk(sample)).toEqual(120);
});

test("should return correct time for BOF (Birds of a Feather) talk type", () => {
  let sample = {
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
    type: "BOF (Birds of a Feather)"
  };
  expect(getTimeForTalk(sample)).toEqual(60);
});

test("should return correct time for Ignite Sessions talk type", () => {
  let sample = {
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
    type: "Ignite Sessions"
  };
  expect(getTimeForTalk(sample)).toEqual(5);
});
