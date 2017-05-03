import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import ReportStats from "./ReportStats";
import SessionView from "./SessionView";

class Report extends Component {
  getTalk(id) {
    return this.props.talkData[id];
  }

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
        {this.props.talks.map((talkId, index) => (
          <SessionView key={index} talk={this.getTalk(talkId)} />
        ))}
      </div>
    );
  }
}
export default Report;
