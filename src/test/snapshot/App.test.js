import React from 'react';
import ReactDOM from 'react-dom';
import Report from '../../main/Component/Report';
import renderer from 'react-test-renderer';

test('report component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

});


test('ReportStats component snapshot', () => {
    const tree = renderer.create(
      <Report />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
