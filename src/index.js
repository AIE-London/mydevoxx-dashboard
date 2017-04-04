import React from 'react';
import ReactDOM from 'react-dom';

import App from './main/components/SpeakerCard/index.js';

import './index.css';

ReactDOM.render(
  <App name="Testy MacTest" company="Testy Inc." blog="forsomereasonihaveablog.com"
       talks={["The Importance of Jazz in modern society","Rory's Roaring Apps: An M.Night Shayamalan production","That other talk"]}/>,
  document.getElementById('root')
);
