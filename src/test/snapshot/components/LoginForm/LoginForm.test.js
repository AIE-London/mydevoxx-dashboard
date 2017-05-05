import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import LoginForm from "../../../../main/components/LoginForm";

test("user email component", () => {
  it("will render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<LoginForm />, div);
  });
});

test("user email component with snapshot", () => {
  const tree = renderer.create(<LoginForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
