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
    position: absolute;
`;

const Container = styled.div`
    width: 600px;
    height: 400px;
    top: 50%;
    left: 50%;
    transform: translateXY(-50%, -50%);
    margin: 0 auto; 
    position: relative; 
`;

class YoutubeVid extends Component {
  minimise() {
    console.log("[VIDEO] Minimising");
    let video = document.getElementById("video");

    let initialPos = video.getBoundingClientRect();

    // Move to bottom right
    video.classList.remove("video-player--animation");
    video.style.position = "fixed";
    video.style.right = "32px";
    video.style.left = "auto";
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
        // Class added - wait for it to apply
        requestAnimationFrame(() => {
          // now apply transform
          video.style.transform = "scale(0.4)";
        });
      });
    });
  }
  render() {
    return (
      <div>

        <Container id="video">
          <Video src={this.props.url + "?modestbranding=1&fs=0"} />
        </Container>
        {this.state.max && <Background onClick={this.minimise} />}
      </div>
    );
  }
}

export default YoutubeVid;
