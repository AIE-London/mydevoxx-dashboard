import React, { Component } from "react";
import styled from "styled-components";
import { Row, Col } from "react-flexbox-grid";

import TwitterFeed from "./TwitterFeed";
import FurtherReading from "./FurtherReading";

const DashboardComponent = styled(Row)`
  border-radius: 2px;
  padding: 0;
  height: 100%;
  font-family: Helvetica;
  box-sizing: border-box;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1em 3em;
  color: #fff;
`;

const Widgets = styled(Row)`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 1;
  flex-wrap: wrap;
  & > * {
    margin-bottom: 0;
    padding: 0.5em;
    box-sizing: border-box;
  }
`;

class Dashboard extends Component {
  render() {
    return (
      <DashboardComponent>
        <h1>MyDashboard</h1>
        <Widgets>
          <Col xs={12} sm={6} md={4}>
            <FurtherReading recommendations={this.props.recommendations} />
          </Col>
          <Col xs={12} sm={6} md={4}>
            <TwitterFeed />
          </Col>
          <Col xs={12} sm={6} md={4}>
            <TwitterFeed />
          </Col>
          <Col xs={12} sm={6} md={4}>
            <TwitterFeed />
          </Col>
          <Col xs={12} sm={6} md={4}>
            <TwitterFeed />
          </Col>
          <Col xs={12} sm={6} md={4}>
            <TwitterFeed />
          </Col>
        </Widgets>
      </DashboardComponent>
    );
  }
}

export default Dashboard;
