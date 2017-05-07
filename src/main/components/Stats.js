/**
 * Created by DLINDSAY on 05-Apr-17.
 */
import { Row, Col } from "react-flexbox-grid";
import Card from "./Card";
import styled from "styled-components";
import { CommaList, CommaListItem } from "./CommaList";
import React, { Component } from "react";

const Container = styled.div`
  color: #000;
  height: 100%;
  margin-bottom: 1em;
  max-width: 520px;
  height: 100%;
`;

const StatsCard = styled(Card)`
  height: 100%;
`;

const StatHeader = styled.h2`
    opacity: 0.8;
    font-family: helvetica;
`;

class Stats extends Component {
  render() {
    try {
      return (
        <Container>
          <StatsCard center="xs">
            {/* Wraps the Card component within the Container component */}
            <Col xs={11}>
              <Col xs={6}>
                <Row start="xs">
                  <h1>My Stats</h1>
                </Row>
              </Col>

              <Row start="xs">
                <Col xs={12}>
                  <StatHeader>Top Tracks:</StatHeader>
                  <div style={{ textAlign: "center" }}>
                    <CommaList>
                      {/* creates a ul element using the CommaList styled ul format */}
                      {this.props.tracks.map(function(track) {
                        return (
                          <CommaListItem key={track}>{track}</CommaListItem>
                        );
                      })}
                    </CommaList>
                  </div>

                  <StatHeader>Top Speakers:</StatHeader>

                  <div style={{ textAlign: "center", paddingBottom: 15 }}>
                    <CommaList>
                      {this.props.speakers.map(function(speaker) {
                        return (
                          <CommaListItem key={speaker}>{speaker}</CommaListItem>
                        );
                      })}
                    </CommaList>
                  </div>
                </Col>
              </Row>
            </Col>

          </StatsCard>
        </Container>
      );
    } catch (error) {
      return (
        <Container>
          <StatsCard center="xs">
            {/* Wraps the Card component within the Container component */}
            <Col xs={11}>
              <Col xs={6}>
                <Row start="xs">
                  <h1>My Stats</h1>
                </Row>
              </Col>

              <Row start="xs">
                <Col xs={12}>
                  <StatHeader>Top Tracks:</StatHeader>

                  <StatHeader>Top Speakers:</StatHeader>
                </Col>
              </Row>
            </Col>

          </StatsCard>
        </Container>
      );
    }
  }
}

export default Stats;
