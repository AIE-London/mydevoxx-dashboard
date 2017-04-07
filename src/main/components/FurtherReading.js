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
    margin-bottom:0px;
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
     margin-left: 30px;
     margin-top:0px;
     margin-bottom:0px;
`;

class furtherReading extends React.Component {
    render() {

        return <Container>
        <Card>
            <Row center="xs">
                    <Col xs={12}>

                        <Col xs={10}>
                            <Row start="xs">
                                <StatMainHeader>Advanced Reading</StatMainHeader>
                                <LinkValue> <a href="https://www.bbc.co.uk"> Link to advanced reading </a> </LinkValue>
                            </Row>
                        </Col>

                        <Row center="xs">
                            <Col xs={10}>

                                <StatValue>{this.props.text} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at gravida neque. Suspendisse
                                    vitae lacus eget tellus facilisis.... </StatValue>

                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Card>
        </Container>

    }
}

export default furtherReading;