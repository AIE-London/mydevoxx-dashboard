/**
 * Created by dcotton on 30/04/2017.
 */
import React from "react";
import ReactDOM from "react-dom";
import SessionsAttended from "../../../../main/components/SessionsAttended";
import renderer from "react-test-renderer";

import Talk from "../../../../main/model/talk";
import Speaker from "../../../../main/model/speaker";

const routeData = {
  reportStats: {
    minutes: 455,
    talks: 10,
    learning: ["Spring", "Java"],
    attendees: 435
  }
};

let speaker1 = new Speaker(
  "da2efaefc17e080c53baff7e6525e65e87ab9774b",
  "Test_Description_2",
  ["MXR-2678a"],
  "Capgeminiaie",
  "Cotton",
  "Daan",
  "http://www.danco.com",
  "https://images.net/photo.jpg",
  "@twitter"
);

let gitTalk = new Talk(
  "MXR-2678b",
  "Test talk title",
  ["method_architecture"],
  "en",
  "Talk Overview over the time..",
  ["da2efaefc17e080c53baff7e6525e65e87ab9774b"],
  null
);

const DevoxxSpeakers = {
  da2efaefc17e080c53baff7e6525e65e87ab9774b: speaker1
};
const DevoxxTalks = {
  "MXR-2678b": gitTalk
};

const UserScheduledFavoured = ["MXR-2678b"];

test("SessionsAttended component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <SessionsAttended
        speakerData={DevoxxSpeakers}
        talkData={DevoxxTalks}
        talkIDs={UserScheduledFavoured}
      />,
      div
    );
  });
});

test("SessionsAttended component with snapshot", () => {
  const tree = renderer
    .create(
      <SessionsAttended
        speakerData={DevoxxSpeakers}
        talkData={DevoxxTalks}
        talkIDs={UserScheduledFavoured}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
