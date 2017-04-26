import React from "react";
import ReactDOM from "react-dom";
import Speaker from "../../../../main/components/SpeakerCard";
import renderer from "react-test-renderer";

const speakerDetail = {
  name: "Test Speaker",
  company: "Capgemini",
  blog: "personalblog.com",
  talks: [
    "Intro to Devoxx (Room 1 - 11:45)",
    "Intro to Devoxx 2 (Room 2 - 13:45)"
  ]
};

test("SpeakerCard component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Speaker
        name="Testy MacTest"
        company="Testy Inc."
        blog="forsomereasonihaveablog.com"
        talks={[
          "The Importance of Jazz in modern society",
          "Rory's Roaring Apps: An M.Night Shayamalan production",
          "That other talk"
        ]}
      />,
      div
    );
  });
});

test("SpeakerCard component with title snapshot", () => {
  const tree = renderer.create(<Speaker speaker={speakerDetail} />).toJSON();
  expect(tree).toMatchSnapshot();
});
