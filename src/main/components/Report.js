import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import TalkCard from './TalkCard';
import ReportStats from './ReportStats';


import testImage from '../../test/snapshot/images/test-image.jpeg';

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


let reportStatsData =
    {
        "minutes": 455,
        "talks": 10,
        "learning": "Spring, Java" ,
        "attendees": 435
    };

class Report extends Component {

  render() {

    let {minutes, talks, learning, attendees} = reportStatsData;

    return (
        <div className="Report">

            <Row center="xs">
                <Col xs={10}>
                    <ReportStats minutes={minutes} talks={talks} learning={learning} attendees={attendees} ></ReportStats>
                </Col>
            </Row>
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

export default Report;
