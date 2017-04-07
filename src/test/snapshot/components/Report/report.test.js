/**
 * Created by dan on 07/04/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Report from '../../../../main/components/Report';
import renderer from 'react-test-renderer';

test('Report component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Report />, div);
  });

});


test('Report component snapshot', () => {
  const tree = renderer.create(
    <Report />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
