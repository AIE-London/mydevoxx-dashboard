/**
 * Created by dcotton on 30/04/2017.
 */
import React from "react";
import ReactDOM from "react-dom";
import FurtherReading from "../../../../main/components/FurtherReading";
import renderer from "react-test-renderer";

const globalRecommendations = [
  {
    name: "Intro to Devoxx",
    url: "http://devoxx.co.uk",
    source: "tracks"
  },
  {
    name: "Intro to Devoxx2",
    url: "http://devoxx.co.uk",
    source: "tracks"
  },
  {
    name: "Intro to Devoxx3",
    url: "http://devoxx.co.uk",
    source: "tracks"
  },
  {
    name: "Intro to Devoxx4",
    url: "http://devoxx.co.uk",
    source: "tracks"
  }
];

test("FurtherReading component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <FutherReading recommendations={globalRecommendations} />,
      div
    );
  });
});

test("FurtherReading component with title snapshot", () => {
  const tree = renderer
    .create(<FurtherReading recommendations={globalRecommendations} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
