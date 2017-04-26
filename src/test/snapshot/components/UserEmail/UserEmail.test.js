import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import UserEmail from "../../../../main/components/UserEmail";

test("user email component", () => {
    it("will render without crashing", () => {
        const div = document.creatElement("div");
        ReactDOM.render(<UserEmail/>, div);
    });
});

test("user email component with snapshot", () => {
    const tree = renderer.create(<UserEmail/>).toJSON();
    expect(tree).toMatchSnapshot();
});


