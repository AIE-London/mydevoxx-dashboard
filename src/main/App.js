import React, { Component } from 'react';
import TalkCard from './components/TalkCard/';
import './App.css';
import {Col, Row} from 'react-flexbox-grid';

const talkDetail = {
  title: 'Welcome to Devoxx 2017',
  description: 'Join the organisers of Devoxx UK and great keynote ' +
  'speakers for inspring stories in 20 minute segments.',
  rating: 4,
  topTracks: [
    'Java',
    'Devoxx',
    'Spring',
  ],
  notes: 'Lorem ipsum dolor sit amet, everti quaestio mel ea. Ex eos ' +
  'volutpat qualisque. Sale tantas cotidieque quo ut, ad nostro consectetuer' +
  ' nec. Feugiat qualisque quo an. Labores officiis te nam.'
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <div style={{height: '72px'}}>
        </div>
        <Row center="xs">
          <Col xs={10}>
            <TalkCard talk={talkDetail}></TalkCard>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
