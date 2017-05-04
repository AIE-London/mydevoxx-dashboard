/**
 * Created by dan on 07/04/2017.
 */
import React from "react";
import ReactDOM from "react-dom";
import Report from "../../../../main/components/Report";
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
  "da2efaefc17e080c53baff7e6525e65e87ab9774a",
  "Test_Description",
  ["MXR-2678a"],
  "Cap AIE",
  "Cotton",
  "Daan",
  "http://www.danco.com",
  "https://images.net/photo.jpg",
  "@twitter"
);

let gitTalk = new Talk(
  "MXR-2678a",
  "Test talk title",
  ["method_architecture"],
  "en",
  "Talk Overview over the time..",
  ["da2efaefc17e080c53baff7e6525e65e87ab9774a"],
  null
);

const DevoxxSpeakers = {
  da2efaefc17e080c53baff7e6525e65e87ab9774a: speaker1
};
const DevoxxTalks = {
  "MXR-2678a": gitTalk
};

const UserScheduledFavoured = ["MXR-2678a"];

test("Report component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Report
        reportStats={routeData.reportStats}
        speakerData={DevoxxSpeakers}
        talkData={DevoxxTalks}
        talks={UserScheduledFavoured}
      />
    );
  });
});

test("Report component snapshot", () => {
  const tree = renderer
    .create(
      <Report
        reportStats={routeData.reportStats}
        speakerData={DevoxxSpeakers}
        talkData={DevoxxTalks}
        talks={UserScheduledFavoured}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
