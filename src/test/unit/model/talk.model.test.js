/**
 * Created by dan on 03/05/2017.
 */

import Talk from "../../../main/model/talk";

let TalkOne;

beforeEach(() => {
  TalkOne = new Talk(
    "TALK-112",
    "Welcome to Devoxx",
    ["track1", "track2"],
    "en",
    "This is a talk about devoxx",
    ["123ABC"],
    "https://youtu.be/vi123deo?123=123"
  );
});

test("Talk model should return correct TalkId", () => {
  expect(TalkOne.id).toEqual("TALK-112");
});

test("Talk model should return correct title", () => {
  expect(TalkOne.title).toEqual("Welcome to Devoxx");
});

test("Talk model should return correct tracks", () => {
  expect(TalkOne.tracks).toEqual(["track1", "track2"]);
});

test("Talk model should return correct language", () => {
  expect(TalkOne.language).toEqual("en");
});

test("Talk model should return correct summary", () => {
  expect(TalkOne.summary).toEqual("This is a talk about devoxx");
});

test("Talk model should return correct Speaker IDs", () => {
  expect(TalkOne.speakers).toEqual(["123ABC"]);
});

test("Talk model should return correct video URL", () => {
  expect(TalkOne.videoID).toEqual("vi123deo");
});
