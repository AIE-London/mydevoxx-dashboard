import React, { Component } from 'react';
import './App.css';
import { Row, Col} from 'react-flexbox-grid';
import TalkCard from './components/TalkCard';
import testImage from '../test/snapshot/images/test-image.jpeg';

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
  ' nec. Feugiat qualisque quo an. Labores officiis te nam.',
  review: {
    name: 'Test User',
    comment: 'Great session, thanks for organising. Looking forward to the next one!',
    image: testImage
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">

          <h2 className="App-day">Day {this.props.dayNo}</h2>
          <h2 className="App-time">{this.props.sTime} - {this.props.room}</h2>
          <Row center="xs">
            <Col xs={10}>
                <TalkCard talk={talkDetail}></TalkCard>
            </Col>
          </Row>
          <h2 className="App-time">Speakers: </h2>

      </div>
    );
  }
}

export default App;