/**
 * Created by tsadler on 07/04/2017.
 */
import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import styled from 'styled-components';
import Card from './Card';

const Container  = styled.div`
  width: 400px;
  height: 400px;
`;

const StatMainHeader = styled.h1`
    text-align: left;
    font-size: 2em;
    font-family: helvetica;
    margin-left: 15px;
`;

const StatValue = styled.p`
    text-align: center;
    font-size: 1em;
    font-family: helvetica;
`;

const LinkValue = styled.p`
    font-size: 0.75em;
    color: #fff;
    font-family: helvetica;
     margin-left: 15px;
`;

class furtherReading extends React.Component {
    render() {

        return <Container>
        <Card>
            <Row center="xs">
                    <Col xs={12}>


                        <Col xs={5}>
                            <Row start="xs">
                                <StatMainHeader>AdvancedReading</StatMainHeader>
                                <LinkValue> <a href> http:www.bbc.com </a> </LinkValue>
                            </Row>
                        </Col>

                        <Row center="xs">
                            <Col xs={10}>

                                <StatValue>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at gravida neque. Suspendisse
                                    vitae lacus eget tellus facilisis .... </StatValue>

                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Card>
        </Container>

    }
}

export default furtherReading;