import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../main/App';

test('app component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

});
