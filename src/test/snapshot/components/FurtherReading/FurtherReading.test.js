/**
 * Created by tsadler on 07/04/2017.
 */
import React from "react";
import ReactDOM from "react-dom";
import FurtherReading from "../../../../main/components/FurtherReading";
import renderer from "react-test-renderer";

test("FurtherReading component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<FutherReading title="Further Reading" />, div);
  });
});

test("FurtherReading component with title snapshot", () => {
  let data = {
    url: "http://www.bbc.co.uk"
  };

  const tree = renderer
    .create(
      <FurtherReading
        mainHeader="Advanced Reading"
        url="http://www.bbc.co.uk"
        urlText="Link to advanced reading"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at gravida neque.Lacus eget tellus facilisis...."
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
