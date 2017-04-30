/**
 * Created by tsadler on 07/04/2017.
 */
import React, { Component } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.section`
  overflow-y: scroll;
  height: 405px;
  width: 100%;
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
  padding: 0.25em 1em;
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
  margin-bottom: 0.25em;
`;

class FurtherReading extends Component {
  render() {
    return (
      <Container id="recommended-reading">
        <Header>Recommendations</Header>
        {this.props.recommendations.map(recommendation => (
          <a key={recommendation.name} href={recommendation.url}>
            <Recommendation>
              <h3>{recommendation.name}</h3>
              <h4>{recommendation.url}</h4>
              <p>Based on your {recommendation.source}</p>
            </Recommendation>
          </a>
        ))}
      </Container>
    );
  }
}

export default FurtherReading;
