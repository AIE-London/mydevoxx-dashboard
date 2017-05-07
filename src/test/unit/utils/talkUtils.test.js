/**
 * Created by dan on 07/05/2017.
 */
import Talk from "../../../main/model/talk";
import { getTopTracks } from "../../../main/utils/talkUtils";

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
