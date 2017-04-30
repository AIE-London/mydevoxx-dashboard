/**
 * Created by dan on 30/04/2017.
 */
import React from "react";
import { Timeline } from "react-twitter-widgets";

const widgetId = "858491567417565185";

export default function TwitterFeed({ height }) {
  return (
    <Timeline
      dataSource={{
        sourceType: "widget",
        widgetId: widgetId
      }}
      options={{
        height: height | 400
      }}
    />
  );
}
