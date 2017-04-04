/**
 * Created by TSADLER on 03/04/2017.
 */
import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import styled from 'styled-components';

const StatMainHeader = styled.h1`
    text-align: left;
    font-size: 2.5em;
    color: #fff;
    font-family: helvetica;
`;

const StatHeader = styled.h2`
    text-align: left;
    font-size: 1.5em;
    color: #fff;
    font-family: helvetica;
`;

const StatValue = styled.p`
    text-align: center;
    font-size: 2em;
    color: #fff;
    font-family: helvetica;
`;
const Orange = styled.span`
    color: #ff9e19;
`;

class reportStats extends React.Component {
    render() {

        return <Row center="xs">
            <Col xs={10}>


                <Col xs={2}>
                    <Row start="xs">
                        <StatMainHeader>MyReport</StatMainHeader>
                    </Row>
                </Col>

                <Row center="xs">
                    <Col xs={10}>

                        <StatHeader>I spent <Orange>450 minutes</Orange></StatHeader>

                        <StatValue>Attending <Orange>9 Talks</Orange></StatValue>

                        <StatHeader>Learning what's new in...</StatHeader>

                        <StatValue>JavaScript, Java, Polymer </StatValue>

                        <StatHeader>Networking with</StatHeader>

                        <StatValue> <Orange>300</Orange> Attendees</StatValue>

                    </Col>
                </Row>
            </Col>

        </Row>
    }
}

export default reportStats;