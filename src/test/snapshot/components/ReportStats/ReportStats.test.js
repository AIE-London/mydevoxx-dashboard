/**
 * Created by TSADLER on 04/04/2017.
 */
import React from "react";
import ReactDOM from "react-dom";
import ReportStats from "../../../../main/components/ReportStats";
import renderer from "react-test-renderer";

test("ReportStats component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ReportStats title="Welcome to Devoxx" />, div);
  });
});
test("ReportStats component with title snapshot", () => {
  const tree = renderer
    .create(
      <ReportStats
        minutes="455"
        talks="10"
        learning="JS, Java, Polymer"
        attendees="345"
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
