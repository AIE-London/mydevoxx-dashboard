import React, {Component} from 'react';
import {Row, Col} from 'react-flexbox-grid';
import styled from 'styled-components';
import Report from './Report';

// Styles for the different elements of the page
const DayText = styled.h2`
   font-size: xx-large;
   text-indent: 50px;
   color: orange;
   margin: 5px 0;
`;

const WhiteText = styled.h2`
  font-size: large;
  text-indent: 50px;
  font-weight: 100;
  color: white;
`;

const Window = styled.div`
  text-align: left;
`;

class SessionView extends Component {
    render() {
        return (
            <Window>

                <DayText>Day {this.props.dayNo}</DayText>

                <WhiteText>{this.props.sTime} - {this.props.room}</WhiteText>

                <Row center="xs">
                    <Col xs={10}>
                        <Report>{this.props.report}</Report>
                    </Col>
                </Row>
            </Window>
        );
    }
}

export default SessionView;
