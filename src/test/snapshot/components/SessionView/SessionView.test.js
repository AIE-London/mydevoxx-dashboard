import React from 'react';
import ReactDOM from 'react-dom';
import SessionView from '../../../../main/components/SessionView';
import renderer from 'react-test-renderer';

test('app component', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SessionView  dayNo="One" sTime="10:00" room="Mezzanine"/>,
            div);
    });

});

test('card component with title snapshot', () => {

  const tree = renderer.create(
    <SessionView dayNo="One" sTime="10:00" room="Mezzanine" />
  ).toJSON();
  expect(tree).toMatchSnapshot();

});