/**
 * Created by tsadler on 07/04/2017.
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

const StatValue = styled.p`
    text-align: center;
    font-size: 2em;
    color: #fff;
    font-family: helvetica;
`;

const LinkValue = styled.p`
    text-align: center;
    font-size: 1em;
    color: #fff;
    font-family: helvetica;
`;

class furtherReading extends React.Component {
    render() {

        return <container>
            <card>
                <Row center="xs">
                    <Col xs={12}>


                        <Col xs={2}>
                            <Row start="xs">
                                <StatMainHeader>Advanced Reading</StatMainHeader>
                                <LinkValue> <a href> http:www.bbc.com </a> </LinkValue>
                            </Row>
                        </Col>

                        <Row center="xs">
                            <Col xs={10}>

                                <StatValue>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at gravida neque. Suspendisse
                                    vitae lacus eget tellus facilisis finibus. Integer vestibulum, risus vel molestie ornare,
                                    urna lacus posuere libero, in convallis ipsum enim at eros.... </StatValue>

                            </Col>
                        </Row>
                    </Col>

                </Row>
            </card>
        </container>
    }
}

export default furtherReading;