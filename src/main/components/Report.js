import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import styled from "styled-components";

import ReportStats from "./ReportStats";
import SessionView from "./SessionView";

import { orderTalksByStartDate } from "../utils/talkUtils";
const UnavailableMessage = styled.h3`
  width: 100%;
  text-align: center;
  color: #fff;
  margin: 2em;
`;

class Report extends Component {
  render() {
    let { minutes, talks, learning, attendees } = this.props.reportStats;

    return (
      <div className="report">
        <Row center="xs">
          <Col xs={12}>
            <ReportStats
              minutes={minutes}
              talks={talks}
              learning={learning}
              attendees={attendees}
            />
          </Col>
        </Row>
        {!this.props.talks || this.props.talks.length < 1
          ? <UnavailableMessage>
              Report unavailable, try again later.
            </UnavailableMessage>
          : orderTalksByStartDate(
              this.props.talks,
              this.props.talkData
            ).map((talkId, index) => (
                <SessionView
                  key={index}
                  talkId={talkId}
                  talkData={this.props.talkData}
                  speakerData={this.props.speakerData}
                />
              ))}
      </div>
    );
  }
}
export default Report;
