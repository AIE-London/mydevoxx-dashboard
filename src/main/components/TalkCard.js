/**
 * Created by dan on 04/04/2017.
 */
import React, { Component } from "react";
import Card from "./Card";
import styled from "styled-components";
import { Col, Row } from "react-flexbox-grid";

import { CommaList, CommaListItem } from "./CommaList";
import StarRating from "./StarRating";

/**
 *  Styled Components
 */
const CardHeader = styled.h2`
  font-family: Helvetica;
  font-weight: 500;
  font-size: 2em;
  margin-bottom: 0;
`;

const CardSubhead = styled.h3`
  font-family: Helvetica;
  font-weight: 500;
  font-size: 1.5em;
  margin-bottom: 0;
`;

const LeftPartition = styled(Col)`
  padding: 0.25em 2em;
`;

const RightPartition = styled(Col)`
  padding: 0.25em 2em;
  padding-top: 1em;
  background: #EEEEEE;
  border-left: solid 1px #BDBDBD;
  border-top: solid 1px #BDBDBD;
  text-align: left;
  padding-bottom: 1em;
`;

const CardParagraph = styled.p`
  padding-left: 1.5em;
  padding-top: 0;
  opacity: 0.6;
  text-align: left;
`;

const CardNotes = styled.textarea`
  font-size: 0.9em;
  background: rgba(255, 255, 255, 0.25);
  border: none;
  flex: 1;
  width: 100%;
  height: 10em;
  margin-top: 1em;
`;

const TrackList = styled(CommaList)`
  opacity: 0.6;
`;

const FullWidthCard = styled(Card)`
  flex: 1;
`;

const CardVideoSubhead = styled(CardSubhead)`
  color: #ff9e19;
`;

class TalkCard extends Component {
  render() {
    // [TODO] Allow the user to rate & store in indexed DB
    let rating = 0;
    let { title, summary, tracks, videoID } = this.props.talk;
    return (
      <FullWidthCard start="xs">
        <LeftPartition xs={12} md={6}>
          <Row start="xs">
            <CardHeader id="title">{title}</CardHeader>
          </Row>
          <Row end="xs">
            <StarRating rating={rating} />
          </Row>
          <CardParagraph>
            {summary}
          </CardParagraph>
          {videoID &&
            <Row>
              <CardVideoSubhead
                onClick={() => this.props.videoSelected(videoID)}
              >
                Play Video
              </CardVideoSubhead>
            </Row>}
        </LeftPartition>
        <RightPartition xs={12} md={6}>
          <Row start="xs">
            <CardSubhead id="notesHeader">My Notes</CardSubhead>
          </Row>
          <CardNotes placeholder="Write notes here..." />
          <Row>
            <CardSubhead>Top Tracks</CardSubhead>
          </Row>
          <Row>
            <TrackList>
              {tracks.map(trackName => (
                <CommaListItem key={trackName}>{trackName}</CommaListItem>
              ))}
            </TrackList>
          </Row>
        </RightPartition>
      </FullWidthCard>
    );
  }
}

export default TalkCard;
