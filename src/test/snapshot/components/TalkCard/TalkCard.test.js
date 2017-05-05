import React from "react";
import ReactDOM from "react-dom";
import TalkCard from "../../../../main/components/TalkCard";
import renderer from "react-test-renderer";

import Speaker from "../../../../main/model/speaker";
import Talk from "../../../../main/model/talk";

const talkData = new Talk(
  "TALK-114",
  "Welcome to Devoxx",
  ["track1", "track2"],
  "en",
  "This is a talk about devoxx",
  ["123AZ"],
  "http://video.youtube.com/1234"
);

const SpeakerData = {
  "123AZ": new Speaker(
    "123AZ",
    "I have a bio like this....",
    ["TALK-114"],
    "Capgemini AIE",
    "Cotton",
    "Dan",
    "http://daniel-cotton.co.uk",
    "http://avatar.url",
    "@danielcottondev"
  )
};

test("card component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <TalkCard talk={talkData} speakerData={SpeakerData} />,
      div
    );
  });
});

test("card component with title snapshot", () => {
  const tree = renderer
    .create(<TalkCard talk={talkData} speakerData={SpeakerData} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
