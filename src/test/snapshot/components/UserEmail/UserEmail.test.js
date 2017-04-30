import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import UserEmail from "../../../../main/components/UserEmail";

/*
    Added function to add required functions onto mock DOM node.
    This is necessary to support 'ref' usage in tests.

    By default - Jest will not allow ref usage.
    Issue: https://github.com/facebook/react/issues/7740
 */
function createNodeMock() {
  return {
    focus() {}
  };
}

test("user email component", () => {
  it("will render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<UserEmail />, div);
  });
});

test("user email component with snapshot", () => {
  const tree = renderer.create(<UserEmail />, { createNodeMock }).toJSON();
  expect(tree).toMatchSnapshot();
});
