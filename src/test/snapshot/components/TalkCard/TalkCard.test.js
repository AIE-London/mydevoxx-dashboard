/**
 * Created by dan on 04/04/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import TalkCard from '../../../../main/components/TalkCard/';
import renderer from 'react-test-renderer';

test('card component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TalkCard title="Welcome to Devoxx" />, div);
  });

});
test('card component with title snapshot', () => {

  const tree = renderer.create(
    <TalkCard title="Welcome to Devoxx" />
  ).toJSON();
  expect(tree).toMatchSnapshot();

});