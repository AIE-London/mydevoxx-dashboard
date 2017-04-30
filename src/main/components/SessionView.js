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
  margin-top: 4em;
`;

const SpeakerSection = styled(Row)`
  margin-top: 3em;
`;

const SpeakerCardContainer = styled(Col)`
  padding: 0 1em;
`;

class SessionView extends Component {
  render() {
    return (
      <Window>

        <DayText>Day {this.props.talk.dayNo}</DayText>

        <WhiteText>{this.props.talk.sTime} - {this.props.talk.room}</WhiteText>

        <Row center="xs">
          <Col xs={10}>
            <Row>
              <TalkCard talk={this.props.talk} />
            </Row>
            <SpeakerSection center="xs">
              {this.props.talk.speakers.map(speaker => (
                <SpeakerCardContainer md={6} xs={12} key={speaker.name}>
                  <SpeakerCard speaker={speaker} />
                </SpeakerCardContainer>
              ))}
              <SpeakerCardContainer md={6} xs={12}>
                <SpeakerCard speaker={this.props.talk.speakers[0]} />
              </SpeakerCardContainer>
              <SpeakerCardContainer md={6} xs={12}>
                <SpeakerCard speaker={this.props.talk.speakers[0]} />
              </SpeakerCardContainer>
            </SpeakerSection>
          </Col>
        </Row>
      </Window>
    );
  }
}

export default SessionView;
