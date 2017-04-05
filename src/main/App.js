import React, { Component } from 'react';
import TalkCard from './components/TalkCard/';
import ReportStats from './components/ReportStats'
import './App.css';
import {Col, Row} from 'react-flexbox-grid';

let reportStatsData =
    {
        "minutes": 455,
        "talks": 10,
        "learning": "JS, Polymer, Java" ,
        "attendees": 435
    };

class App extends Component {

  render() {

    let {minutes, talks, learning, attendees} = reportStatsData;

    return (
      <div className="App">
        <Row center="xs">
          <Col xs={10}>
            <TalkCard></TalkCard>
          </Col>
        </Row>
          <Row center="xs">
              <Col xs={10}>
                  <ReportStats  minutes={minutes} talks={talks} learning={learning} attendees={attendees} ></ReportStats>
              </Col>
          </Row>
      </div>
    );
  }
}

export default App;
