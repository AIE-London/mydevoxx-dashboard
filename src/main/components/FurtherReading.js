/**
 * Created by dcotton on 30/04/2017.
 */
import React, { Component } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.section`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  max-width: 520px;
  padding-right: 0.5em;
`;

const Header = styled.h2`
  text-align: left;
  font-size: 2em;
  font-family: helvetica;
  margin-left: 0;
  padding-left: 0;
  margin-bottom: 0.5em;
`;

const Recommendation = styled(Card)`
  padding: 1em 1em;
  display: flex;
  flex-direction: column;
  & > h3 {
    color: #000;
    font-size: 2em;
    margin-bottom: 0;
  }
  & > h4 {
    color: #ff9e19;
    margin-top: 5px;
  }
  & > p {
    opacity: 0.5;
    color: #000;
    text-align: right;
  }
  margin-bottom: 0.75em;
`;

class FurtherReading extends Component {
  render() {
    return (
      <Container id="recommended-reading">
        <Header>Recommendations</Header>
        {this.props.recommendations.map(recommendation => (
          <a key={recommendation.title} href={recommendation.link}>
            <Recommendation>
              <h3>{recommendation.title}</h3>
              <h4>{recommendation.link}</h4>
              <p>Based on your {recommendation.source}</p>
            </Recommendation>
          </a>
        ))}
      </Container>
    );
  }
}

export default FurtherReading;
