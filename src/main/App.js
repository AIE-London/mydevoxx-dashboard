import React, { Component } from 'react';
import TalkCard from './components/TalkCard/';
import ReportStats from './components/ReportStats'
import './App.css';
import {Col, Row} from 'react-flexbox-grid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Row center="xs">
          <Col xs={10}>
            <TalkCard></TalkCard>
          </Col>
        </Row>
          <Row center="xs">
              <Col xs={10}>
                  <ReportStats  minutes="455" talks="10" learning="JS, Java, Polymer" attendees="345" ></ReportStats>
              </Col>
          </Row>
      </div>
    );
  }
}

export default App;
