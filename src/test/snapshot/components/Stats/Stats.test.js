import React from "react";
import ReactDOM from "react-dom";
import Stats from "../../../../main/components/Stats";
import renderer from "react-test-renderer";

test("card component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Stats
        tracks={["Agile", "Bgile", "Cgile"]}
        speakers={["Person One", "Person Two", "Person Three"]}
      />,
      div
    );
  });
});
test("stats component with all properties filled", () => {
  const tree = renderer
    .create(
      <Stats
        tracks={["Agile", "Bgile", "Cgile"]}
        speakers={["Person One", "Person Two", "Person Three"]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
