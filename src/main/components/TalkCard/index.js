/**
 * Created by dan on 04/04/2017.
 */
import React, { Component } from 'react';
import Card from '../Card';
import styled from 'styled-components';
import {Col, Row} from 'react-flexbox-grid';

import {CommaList, CommaListItem} from '../CommaList';
import StarRating from '../StarRating';

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
  text-align: left;
`;

const CardParagraph = styled.p`
  padding-left: 1.5em;
  padding-top: 0;
  opacity: 0.6;
  text-align: left;
`;

const CardNotes = styled(CardParagraph)`
  font-size: 0.9em;
`;

class TalkCard extends Component {
  render() {
    return (
      <Card start="xs">
        <LeftPartition xs={6}>
          <Row start="xs">
            <CardHeader id="title">{ this.props.title }</CardHeader>
          </Row>
          <Row end="xs">
            <StarRating rating="4"></StarRating>
          </Row>
          <CardParagraph>
            Join the organisers of Devoxx UK and great keynote speakers for inspring stories in 20 minute segments.
          </CardParagraph>
          <Row>
            <CardSubhead>Top Tracks</CardSubhead>
          </Row>
          <Row>
            <CommaList>
              <CommaListItem>Java</CommaListItem>
              <CommaListItem>Devoxx</CommaListItem>
              <CommaListItem>Spring</CommaListItem>
            </CommaList>
          </Row>
        </LeftPartition>
        <RightPartition xs={6}>
          <Row start="xs">
            <CardSubhead id="notesHeader">My Notes</CardSubhead>
          </Row>
          <Row start="xs">
            <CardNotes>Lorem ipsum dolor sit amet, everti quaestio mel ea. Ex eos volutpat qualisque. Sale tantas cotidieque quo ut, ad nostro consectetuer nec. Feugiat qualisque quo an. Labores officiis te nam.</CardNotes>
          </Row>
          <Row start="xs">
            <CardSubhead id="notesHeader">My Reviews</CardSubhead>
          </Row>
          <Row start="xs">
            <p>Feugiat qualisque quo an. Labores officiis te nam.</p>
          </Row>
        </RightPartition>
      </Card>
    );
  }
}

export default TalkCard;
