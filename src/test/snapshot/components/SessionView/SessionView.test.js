import React from "react";
import ReactDOM from "react-dom";
import SessionView from "../../../../main/components/SessionView";
import renderer from "react-test-renderer";

import Speaker from "../../../../main/model/speaker";
import Talk from "../../../../main/model/talk";

const TalkData = {
  "TALK-A11": new Talk(
    "TALK-A11",
    "Welcome to Devoxx 2017",
    ["track4", "trackJAVA"],
    "en",
    "This is an opening talk about Devoxx",
    ["123AZB"],
    "http://video.youtube.com/1234"
  )
};

const SpeakerData = {
  "123AZB": new Speaker(
    "123AZB",
    "I have a bio like this, it describes me as a speaker.",
    ["TALK-A11"],
    "CapgeminiAIE",
    "Cotton",
    "Dan",
    "http://daniel-cotton.co.uk/",
    "http://avatar.url.test",
    "@danielcottondev"
  )
};

const TalkId = "TALK-A11";

test("app component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <SessionView
        talkId={TalkId}
        talkData={TalkData}
        speakerData={SpeakerData}
      />,
      div
    );
  });
});

test("card component with title snapshot", () => {
  const tree = renderer
    .create(
      <SessionView
        talkId={TalkId}
        talkData={TalkData}
        speakerData={SpeakerData}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
