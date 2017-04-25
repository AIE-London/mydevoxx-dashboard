import React from "react";
import ReactDOM from "react-dom";
import App from "../../main/App";
import renderer from "react-test-renderer";

test("app component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });
});

test("App component snapshot", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
