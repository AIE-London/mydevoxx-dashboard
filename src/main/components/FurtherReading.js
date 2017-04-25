/**
 * Created by tsadler on 07/04/2017.
 */
import React, { Component } from 'react';
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
    margin-bottom: 0px;
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
     margin-top: 0px;
     margin-bottom: 0px;
`;

class FurtherReading extends Component {
    render() {
        return <Container>
        <Card>
            <Row center="xs">
                    <Col xs={12}>
                        <Col xs={10}>
                            <Row start="xs">
                                <StatMainHeader>{this.props.mainHeader}</StatMainHeader>
                                <LinkValue>
                                    <a href={this.props.url}>{this.props.urlText}</a>
                                </LinkValue>
                            </Row>
                        </Col>
                        <Row center="xs">
                            <Col xs={10}>
                                <StatValue>{this.props.text}</StatValue>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Container>
    }
}

export default FurtherReading;