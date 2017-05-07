import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import ReportStats from "./ReportStats";
import SessionView from "./SessionView";

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
        {this.props.talks
          .sort((talka, talkb) => {
            if (talka.startTime && talkb.startTime) {
              return talkb.startTime - talka.startTime;
            } else {
              return 0;
            }
          })
          .map((talkId, index) => (
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
