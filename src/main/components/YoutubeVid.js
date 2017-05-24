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

const VideoContainer = styled.div`
    opacity: 1;
    width: 100%;
    height: 100%;
    border: 0;
    position: relative;
    margin: 0;
    padding: 0;
`;

const Video = styled.iframe`
    opacity: 1;
    width: 100%;
    height: 100%;
    border: 0;
    position: absolute;
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
`;

const Menu = styled.div`
  background: -moz-linear-gradient(top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#00000000',GradientType=0 ); /* IE6-9 */
  color: #fff;
  width: 100%;
  height: 40%;
  opacity: 0;
  padding: 0.5em;
  padding-top: 0.25em;
  box-sizing: border-box;
  &:hover {
    opacity: ${({ max }) => (max ? 0 : 0.9)};
    display: ${({ max }) => (max ? "none" : "block")};
  }
  font-size: 5em;
  
`;

const Container = styled.div`
    z-index: 100;    
    cursor: pointer;
    position: fixed;
    width: 600px;
    height: 400px;
    background: black;
    left: 50%;
    top: 50%;
    bottom: auto;
    transform: translateX(-50%) translateY(-50%);
    transform-origin: 100% 100%;
    margin: 0 auto; 
`;

class YoutubeVid extends Component {
  constructor() {
    super();
    this.state = { max: true };
    this.minimise = this.minimise.bind(this);
    this.maximise = this.maximise.bind(this);
  }

  maximise() {
    let video = document.getElementById("video");
    this.setState({ max: true });
    let initialPos = video.getBoundingClientRect();

    // Move to bottom right
    video.classList.remove("video-player--animation");
    video.removeAttribute("style");

    // Get position
    let endPos = video.getBoundingClientRect();

    // Get Delta
    let delta = {
      x: initialPos.right - endPos.right,
      y: initialPos.bottom - endPos.bottom,
      s: initialPos.width / endPos.width
    };

    let priorTransform = window.getComputedStyle(video).transform;

    // Restore
    video.style.transform =
      priorTransform +
      " translate(" +
      delta.x +
      "px, " +
      delta.y +
      "px) scale(" +
      delta.s +
      ")";

    requestAnimationFrame(() => {
      // Waited one frame - now wait another and add animation
      requestAnimationFrame(() => {
        video.classList.add("video-player--animation");
        // Class added - wait for it to apply
        requestAnimationFrame(() => {
          // now remove existing transform
          video.removeAttribute("style");
        });
      });
    });
  }

  minimise() {
    let video = document.getElementById("video");

    let initialPos = video.getBoundingClientRect();

    // Move to bottom right
    video.classList.remove("video-player--animation");
    video.style.position = "fixed";
    video.style.right = "32px";
    video.style.left = "auto";
    video.style.top = "auto";
    video.style.bottom = "32px";
    video.style.transform = "scale(0.4)";

    // Get position
    let endPos = video.getBoundingClientRect();

    // Get Delta
    let delta = {
      x: initialPos.right - endPos.right,
      y: initialPos.bottom - endPos.bottom,
      s: initialPos.width / endPos.width
    };

    // Restore
    video.style.transform =
      "translate(" +
      delta.x +
      "px, " +
      delta.y +
      "px) scale(" +
      delta.s * 0.4 +
      ")";

    requestAnimationFrame(() => {
      // Waited one frame - now wait another and add animation
      requestAnimationFrame(() => {
        video.classList.add("video-player--animation");
        this.setState({ max: false });
        // Class added - wait for it to apply
        requestAnimationFrame(() => {
          // now apply transform
          video.style.transform = "scale(0.4)";
        });
      });
    });
  }

  processURL(url) {
    return "https://www.youtube.com/embed/" + url + "?modestbranding=1&fs=0";
  }

  render() {
    return (
      <div>

        <Container id="video">
          <VideoContainer>
            <Video src={this.processURL(this.props.url)} />
            <Menu max={this.state.max}>
              <span onClick={this.maximise}>^</span>
            </Menu>
          </VideoContainer>
        </Container>
        {this.state.max && <Background onClick={this.minimise} />}
      </div>
    );
  }
}

export default YoutubeVid;
