import React from "react";
import ReactDOM from "react-dom";
import Speaker from "../../../../main/components/SpeakerCard";
import renderer from "react-test-renderer";

import SpeakerData from "../../../../main/model/speaker";
import Talk from "../../../../main/model/talk";

const speakerDetail = new SpeakerData(
  "SPEAKER-123",
  "I have a bio, it goes like this....",
  ["TALK-113"],
  "Capgemini",
  "Cotton",
  "Dan",
  "http://daniel-cotton.co.uk",
  "http://avatar.url",
  "@danielcottondev"
);

const talkData = {
  "TALK-113": new Talk(
    "TALK-113",
    "Talk Title Tester",
    ["java", "junit"],
    "fr",
    "Git workflow, Java - words to pad out the test overview....",
    ["SPEAKER-123"]
  )
};

test("SpeakerCard component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Speaker speaker={speakerDetail} talkData={talkData} />,
      div
    );
  });
});

test("SpeakerCard component with title snapshot", () => {
  const tree = renderer
    .create(<Speaker speaker={speakerDetail} talkData={talkData} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
