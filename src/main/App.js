import React, { Component } from 'react';
import TalkCard from './components/TalkCard/';
import './App.css';
import {Col, Row} from 'react-flexbox-grid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div style={{height: '72px'}}>
        </div>
        <Row center="xs">
          <Col xs={10}>
            <TalkCard title="Welcome to Devoxx 2017"></TalkCard>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
