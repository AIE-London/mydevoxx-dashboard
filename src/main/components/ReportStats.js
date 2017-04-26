/**
 * Created by TSADLER on 03/04/2017.
 */
import { Row, Col } from "react-flexbox-grid";
import styled from "styled-components";
import React, { Component } from "react";

const StatMainHeader = styled.h1`
    text-align: left;
    font-size: 2.5em;
    color: #fff;
    font-family: helvetica;
`;

const StatHeader = styled.h2`
    text-align: left;
    font-size: 1.5em;
    color: #fff;
    font-family: helvetica;
`;

const StatValue = styled.p`
    text-align: center;
    font-size: 2em;
    color: #fff;
    font-family: helvetica;
`;
const Orange = styled.span`
    color: #ff9e19;
`;

class ReportStats extends Component {
  render() {
    return (
      <Row center="xs">
        <Col xs={10}>

          <Col xs={2}>
            <Row start="xs">
              <StatMainHeader>MyReport</StatMainHeader>
            </Row>
          </Col>

          <Row center="xs">
            <Col xs={10}>

              <StatHeader>
                I spent <Orange>{this.props.minutes} minutes</Orange>
              </StatHeader>

              <StatValue>
                Attending <Orange>{this.props.talks} talks</Orange>
              </StatValue>

              <StatHeader>Learning what's new in...</StatHeader>

              <StatValue>{this.props.learning} </StatValue>

              <StatHeader>Networking with</StatHeader>

              <StatValue>
                {" "}<Orange>{this.props.attendees}</Orange> Attendees
              </StatValue>

            </Col>
          </Row>
        </Col>

      </Row>
    );
  }
}

export default ReportStats;
