// Imports
import React, { Component } from 'react';
import { Row, Col} from 'react-flexbox-grid';
import TalkCard from './TalkCard';
import SpeakerCard from './SpeakerCard';
import testImage from '../../test/snapshot/images/test-image.jpeg';
import styled from 'styled-components';


// Data Input for the TalkCard Componenent
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

// Styles for the different elements of the page
const DayText = styled.h2`
   font-size: xx-large;
   text-indent: 50px;
   color: orange;
   margin: 5px 0;
`;

const WhiteText = styled.h2`
  font-size: large;
  text-indent: 50px;
  font-weight: 100;
  color: white;
`;

const Window = styled.div`
  text-align: left;
`;



class SessionView extends Component {
    render() {
        return (
            <Window>

                <DayText>Day {this.props.dayNo}</DayText>

                <WhiteText>{this.props.sTime} - {this.props.room}</WhiteText>

                {/*Puts elemenst inside the <Row> within a row format, this is then split into columns so that the TalkCard Component can position elements correctly*/}
                <Row center="xs">
                    <Col xs={10}>
                        <TalkCard talk={talkDetail}></TalkCard>
                    </Col>
                </Row>

                <WhiteText>Speakers: </WhiteText>

                {/*Imports for the Speaker card are within the imports, the parameters are then provide for them to be displayed*/}
                <Row around="xs">
                    <SpeakerCard name="Test Speaker" company="Capgemini" blog="personalblog.com" talks={["Intro to Devoxx (Room 1 - 11:45)"]} ></SpeakerCard>
                    <SpeakerCard name="Test Speaker" company="Capgemini" blog="personalblog.com" talks={["Intro to Devoxx (Room 1 - 11:45)"]}></SpeakerCard>
                </Row>



            </Window>
        );
    }
}

export default SessionView;
