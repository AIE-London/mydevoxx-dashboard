import React, { Component } from 'react';
import TalkCard from './components/TalkCard/';
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
      </div>
    );
  }
}

export default App;
