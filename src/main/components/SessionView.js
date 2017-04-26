import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import styled from "styled-components";
import TalkCard from "./TalkCard";
import SpeakerCard from "./SpeakerCard";

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

        <DayText>Day {this.props.talk.dayNo}</DayText>

        <WhiteText>{this.props.talk.sTime} - {this.props.talk.room}</WhiteText>

        <Row center="xs">
          <Col xs={10}>
            <TalkCard talk={this.props.talk} />
          </Col>
          <Col xs={10}>
            {this.props.talk.speakers.map(speaker => (
              <SpeakerCard key={speaker.name} speaker={speaker} />
            ))}
          </Col>
        </Row>
      </Window>
    );
  }
}

export default SessionView;
