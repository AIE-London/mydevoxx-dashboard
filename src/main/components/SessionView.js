import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import styled from "styled-components";
import TalkCard from "./TalkCard";
import SpeakerCard from "./SpeakerCard";
import debugLog from "../utils/debugLog";

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
const days = ["One", "Two"];

class SessionView extends Component {
  render() {
    let talk = this.props.talkData[this.props.talkId];
    let header;
    try {
      header = (
        <div>
          <DayText>Day {days[talk.startTime.getDay() - 4]}</DayText>
          <WhiteText>
            {talk.startTime.getHours()}
            :
            {talk.startTime.getMinutes()}
            {" "}
            -
            {" "}
            {talk.room}
          </WhiteText>
        </div>
      );
    } catch (error) {
      debugLog.log("Failed to provide time");
    }
    try {
      return (
        <Window>

          {/* [TODO] Re-instate once we've added in a means of calculating
                 day/time/room */}

          {header}

          <Row center="xs">
            <Col xs={10}>
              <Row>
                <TalkCard talk={talk} />
              </Row>
              <SpeakerSection center="xs">
                {talk.speakers.map(speakerID => {
                  try {
                    let speaker = this.props.speakerData[speakerID];
                    return (
                      <SpeakerCardContainer md={6} xs={12} key={speaker.name}>
                        <SpeakerCard
                          speaker={speaker}
                          talkData={this.props.talkData}
                        />
                      </SpeakerCardContainer>
                    );
                  } catch (error) {
                    return <span />;
                  }
                })}
              </SpeakerSection>
            </Col>
          </Row>
        </Window>
      );
    } catch (error) {
      return <h3>Loading</h3>;
    }
  }
}

export default SessionView;
