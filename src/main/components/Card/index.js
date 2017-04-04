/**
 * Created by dan on 04/04/2017.
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import {Col} from 'react-flexbox-grid';

const Card = styled(Col)`
  background: #FAFAFA;
  border-radius: 2px;
  padding: 0;
  box-sizing: border-box;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;

export default Card;