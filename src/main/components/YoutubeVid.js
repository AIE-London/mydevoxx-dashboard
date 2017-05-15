/**
 * Created by CSHEFIK on 15/05/2017.
 */
import React, { Component } from "react";
import styled from "styled-components";

const Background = styled.div`
  background: rgba(0,0,0,0.75);
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 99;
  position: fixed;
`;

const Video = styled.iframe`
    z-index: 100;  
    opacity: 1;
    width: 100%;
    height: 100%;
    border: 0;
`;

const Container = styled.div`
    width: 70%;
    height: 70%;
    top: 15%; 
    margin: 0 auto; 
    position: relative; 
`;

class YoutubeVid extends Component {
  render() {
    return (
      <Background>

        <Container>
          <Video src={this.props.URL} />
        </Container>
      </Background>
    );
  }
}

export default YoutubeVid;
