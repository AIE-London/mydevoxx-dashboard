import React, { Component } from 'react';
import './App.css';
import {Col, Row} from 'react-flexbox-grid';
import ReportStats from './components/ReportStats';

let reportStatsData =
    {
        "minutes": 455,
        "talks": 10,
        "learning": "JS, Polymer, Java" ,
        "attendees": 435
    };

import SessionView from './components/SessionView';




class App extends Component {

  render() {

    let {minutes, talks, learning, attendees} = reportStatsData;

    return (
      <div className="App">

          <Row center="xs">
              <Col xs={10}>
                  <ReportStats  minutes={minutes} talks={talks} learning={learning} attendees={attendees} ></ReportStats>
              </Col>
          </Row>
          <SessionView dayNo="One" sTime="10:00" room="Mezzanine">

          </SessionView>
      </div>
    );
  }
}

export default App;