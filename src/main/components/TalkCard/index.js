/**
 * Created by dan on 04/04/2017.
 */
import React, { Component } from 'react';
import Card from '../Card';
import styled from 'styled-components';
import {Col, Row} from 'react-flexbox-grid';

/**
 *  Styled Components
 */
const CardHeader = styled.h2`
  font-family: Helvetica;
  font-weight: 500;
  font-size: 2em;
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
  font-size: 0.9em;
`;

class TalkCard extends Component {
  render() {
    return (
      <Card left="xs">
        <LeftPartition xs={6}>
          <Row left="xs">
            <CardHeader id="title">{ this.props.title }</CardHeader>
          </Row>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </LeftPartition>
        <RightPartition xs={6}>
          <Row left="xs">
            <CardSubhead id="notesHeader">My Notes</CardSubhead>
          </Row>
          <Row left="xs">
            <CardParagraph>Lorem ipsum dolor sit amet, everti quaestio mel ea. Ex eos volutpat qualisque. Sale tantas cotidieque quo ut, ad nostro consectetuer nec. Feugiat qualisque quo an. Labores officiis te nam.</CardParagraph>
          </Row>
          <Row left="xs">
            <CardSubhead id="notesHeader">My Reviews</CardSubhead>
          </Row>
          <Row left="xs">
            <p>Feugiat qualisque quo an. Labores officiis te nam.</p>
          </Row>
        </RightPartition>
      </Card>
    );
  }
}

export default TalkCard;
