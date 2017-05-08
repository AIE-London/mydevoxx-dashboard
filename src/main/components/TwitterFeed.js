/**
 * Created by dan on 30/04/2017.
 */
import React from "react";
import { Timeline } from "react-twitter-widgets";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

const widgetId = "858491567417565185";

export default class TwitterFeed extends React.Component {
  render() {
    return (
      <Container ref="container">
        <Timeline
          dataSource={{
            sourceType: "widget",
            widgetId: widgetId
          }}
          options={{
            height: 390
          }}
        />
      </Container>
    );
  }
}
