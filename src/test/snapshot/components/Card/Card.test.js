/**
 * Created by dan on 04/04/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Card from '../../../../main/components/Card/';

test('card component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Card />, div);
  });

});