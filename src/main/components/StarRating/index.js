/**
 * Created by dan on 04/04/2017.
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import {Row} from 'react-flexbox-grid';

const Star = styled.div`
  margin: 6.25px 0;
  position: relative;
  display: block;
  color: red;
  width: 0px;
  opacity: 0.3;
  height: 0px;
  border-right:  12.5px solid transparent;
  border-bottom: 8.75px  solid grey;
  border-left:   12.5px solid transparent;
  -moz-transform:    rotate(35deg);
  -webkit-transform: rotate(35deg);
  -ms-transform:     rotate(35deg);
  -o-transform:      rotate(35deg);
  &:before {
    border-bottom: 10px solid grey;
    border-left: 3.75px solid transparent;
    border-right: 3.75px solid transparent;
    position: absolute;
    height: 0;
    width: 0;
    top: -5.625px;
    left: -8.125px;
    display: block;
    content: '';
    -webkit-transform: rotate(-35deg);
    -moz-transform:    rotate(-35deg);
    -ms-transform:     rotate(-35deg);
    -o-transform:      rotate(-35deg);
  }
  &:after {
    position: absolute;
    display: block;
    color: red;
    top: 1px;
    left: -13px;
    width: 0px;
    height: 0px;
    border-right: 12.5px solid transparent;
    border-bottom: 8.75px solid grey;
    border-left: 12.5px solid transparent;
    -webkit-transform: rotate(-70deg);
    -moz-transform:    rotate(-70deg);
    -ms-transform:     rotate(-70deg);
    -o-transform:      rotate(-70deg);
    content: '';
  }
`;
const ActiveStar = styled(Star)`
  opacity: 1;
  border-bottom-color: #ff9e19;
  &:before {
    border-bottom-color: #ff9e19;
  }
  &:after {
    border-bottom-color: #ff9e19;
  }
`;
class StarRating extends Component {
  getStars(rating){
    var stars = [];
    for(var i = 1; i <= 5; i++) {
      if (i <= rating){
        stars.push(<ActiveStar/>);
      } else {
        stars.push(<Star/>);
      }
    }
    return stars;
  }
  render() {
    return (
      <Row left="xs">
        {this.getStars(this.props.rating)}
      </Row>
    );
  }
}

export default StarRating;
