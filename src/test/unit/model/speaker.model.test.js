/**
 * Created by dan on 03/05/2017.
 */

import Speaker from "../../../main/model/speaker";

let SpeakerOne;

beforeEach(() => {
  SpeakerOne = new Speaker(
    "123ABC",
    "This is my bio",
    ["TALK-112"],
    "Capgemini",
    "Cotton",
    "Dan",
    "http://blog.blog.com",
    "http://avatar.url",
    "@danielcottondev"
  );
});

test("speaker model should return correct uuid", () => {
  expect(SpeakerOne.uuid).toEqual("123ABC");
});

test("speaker model should return correct bio", () => {
  expect(SpeakerOne.bio).toEqual("This is my bio");
});

test("speaker model should return correct talkIds", () => {
  expect(SpeakerOne.acceptedTalkIDs).toEqual(["TALK-112"]);
});

test("speaker model should return correct company", () => {
  expect(SpeakerOne.company).toEqual("Capgemini");
});

test("speaker model should return correct name", () => {
  expect(SpeakerOne.name).toEqual("Dan Cotton");
});

test("speaker model should return correct blog", () => {
  expect(SpeakerOne.blog).toEqual("http://blog.blog.com");
});

test("speaker model should return correct avatarURL", () => {
  expect(SpeakerOne.avatarURL).toEqual("http://avatar.url");
});

test("speaker model should return correct twitter handle", () => {
  expect(SpeakerOne.twitter).toEqual("@danielcottondev");
});
