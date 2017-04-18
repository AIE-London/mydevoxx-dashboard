import React, { Component } from 'react';
import styled from 'styled-components';
import {Row} from 'react-flexbox-grid';

const talk = styled(Row)`
  background: #FAFAFA;
  border-radius: 2px;
  padding: 0;
  font-family: Helvetica;
  box-sizing: border-box;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;

class Talk extends Component {
    render() {
        return (
            <div>
                Talk
            </div>
        )
    }
}

export default Talk;
