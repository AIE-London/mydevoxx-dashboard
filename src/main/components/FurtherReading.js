/**
 * Created by dcotton on 30/04/2017.
 */
import React, { Component } from "react";
import styled from "styled-components";
import Card from "./Card";
import UnavailableView from "./UnavailableView";

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
  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  & > div > div {
    flex: 1;
  }
  & > div > div > h3 {
    color: #000;
    font-size: 1.5em;
    margin-bottom: 0;
  }
  & > div > div > h4 {
    color: #ff9e19;
    margin-top: 5px;
  }
  & > div > img {
    border-radius: 50%;
    height: 5em;
    width: 5em;
    flex-shrink: 0;
  }
  & > p {
    opacity: 0.5;
    color: #000;
    text-align: right;
  }
  margin-bottom: 0.5em;
`;

let RecommendationLink = function({ children, link, title }) {
  if (link) {
    return (
      <a key={title} href={link}>
        {children}
      </a>
    );
  } else {
    return (
      <div>
        {children}
      </div>
    );
  }
};

class FurtherReading extends Component {
  render() {
    return (
      <Container id="recommended-reading">
        <Header>Recommendations</Header>
        <UnavailableView itemName="recommendations" textColor="#fff">
          {this.props.recommendations.map(recommendation => (
            <RecommendationLink
              title={recommendation.title}
              link={recommendation.link}
            >
              <Recommendation>
                <div>
                  <div>
                    <h3>{recommendation.title}</h3>
                    {recommendation.linkName &&
                      <h4>{recommendation.linkName}</h4>}
                  </div>
                  {recommendation.imageurl &&
                    <img
                      src={recommendation.imageurl}
                      alt={
                        "A snapshot of a YouTube video entitled: " +
                          recommendation.title
                      }
                    />}
                </div>
                <p>Based on your {recommendation.source}</p>
              </Recommendation>
            </RecommendationLink>
          ))}
        </UnavailableView>
      </Container>
    );
  }
}

export default FurtherReading;
