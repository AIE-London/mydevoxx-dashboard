import React from 'react';
import ReactDOM from 'react-dom';

import App from './main/App';

import './index.css';

ReactDOM.render(
  <App minutes="455" talks="10" learning="JS, Java, Polymer" attendees="345"/>,
  document.getElementById('root')
);
