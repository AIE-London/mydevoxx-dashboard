/**
 * Created by dcotton on 30/04/2017.
 */
import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

import FurtherReading from "../../../../main/components/FurtherReading";
import Recommendation from "../../../../main/model/recommendation";

const globalRecommendations = [
  new Recommendation(
    "Intro to Devoxx",
    "http://devoxx.co.uk",
    "Devoxx Webpage",
    null,
    "blog",
    "tracks"
  ),
  new Recommendation(
    "Intro to Devoxx2",
    "http://devoxx.co.uk",
    "Devoxx Webpage",
    null,
    "blog",
    "tracks"
  ),
  new Recommendation(
    "Intro to Devoxx3",
    "http://devoxx.co.uk",
    "Devoxx Webpage",
    null,
    "blog",
    "tracks"
  ),
  new Recommendation(
    "Intro to Devoxx4",
    "http://devoxx.co.uk",
    "Devoxx Webpage",
    null,
    "blog",
    "tracks"
  )
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
