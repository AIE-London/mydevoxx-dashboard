import React, { Component } from "react";
import styled from "styled-components";
import { Row } from "react-flexbox-grid";

import TwitterFeed from "./TwitterFeed";

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

const Widgets = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 1;
  flex-wrap: wrap;
  & * {
    width: 33%;
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
          <TwitterFeed />
          <TwitterFeed />
          <TwitterFeed />
          <TwitterFeed />
          <TwitterFeed />
          <TwitterFeed />
        </Widgets>
      </DashboardComponent>
    );
  }
}

export default Dashboard;
