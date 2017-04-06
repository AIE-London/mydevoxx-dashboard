import React from 'react';
import ReactDOM from 'react-dom';

import App from './main/components/Stats';

import './index.css';

ReactDOM.render(
  <App tracks={["Agile", "Bgile", "Cgile"]} speakers={["Person One", "Person Two", "Person Three"]}/>,
  document.getElementById('root')
);
