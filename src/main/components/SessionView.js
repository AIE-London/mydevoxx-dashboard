import React, {Component} from 'react';
import {Row, Col} from 'react-flexbox-grid';
import TalkCard from './TalkCard';
import SpeakerCard from './SpeakerCard';
import styled from 'styled-components';
import Report from './Report';

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
                        <Report>
                            <TalkCard talk={talkDetail}></TalkCard>
                        </Report>
                    </Col>
                </Row>

                <WhiteText>Speakers: </WhiteText>

                {/*Imports for the Speaker card are within the imports, the parameters are then provide for them to be displayed*/}
                <Row around="xs">
                    <SpeakerCard name="Test Speaker" company="Capgemini" blog="personalblog.com"
                                 talks={["Intro to Devoxx (Room 1 - 11:45)"]}></SpeakerCard>
                    <SpeakerCard name="Test Speaker" company="Capgemini" blog="personalblog.com"
                                 talks={["Intro to Devoxx (Room 1 - 11:45)"]}></SpeakerCard>
                </Row>


            </Window>
        );
    }
}

export default SessionView;
