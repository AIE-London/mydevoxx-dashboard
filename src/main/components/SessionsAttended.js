/**
 * Created by tsadler on 06/04/2017.
 */
import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import styled from 'styled-components';
import Card from './Card';
import Default from './defaultIcon.png';

const Container = styled.div`
  width: 400px;
  height: 400px;
`;

const StatMainHeader = styled.h1`
    text-align: left;
    font-size: 2em;
    font-family: helvetica;
`;

const CardHeader = styled.h2`
  font-family: Helvetica;
  font-weight: 500;
  font-size: 1.75em;
  margin-bottom: 0;
  text-align: left;
`;

const CardSubhead = styled.h3`
  font-family: Helvetica;
  font-weight: 500;
  font-size: 1.5em;
  margin-bottom: 0;
`;

const Image = styled.img`
    width: 50px;
    height: 50px;
    marginTop: 20px;
`;

class sessionsAttended extends React.Component {
    render() {
        return <Container>
            <Card>
                <Col xs={12}>
                    <Col xs={10}>
                        <Row start="xs">
                            <StatMainHeader>{this.props.mainHeader}</StatMainHeader>
                        </Row>
                    </Col>

                    <Row center="xs">
                        <Col xs={10}>
                            <Row start="xs" middle="xs">
                                <Col xs>
                                    <CardHeader>{this.props.title}</CardHeader>
                                    <p>{this.props.cardContent}</p>
                                </Col>
                                <Col xs={2}><Image src={Default}></Image></Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row center="xs">
                        <Col xs={10}>
                            <Row start="xs" middle="xs">
                                <Col xs>
                                    <CardSubhead>{this.props.subHeader}</CardSubhead>
                                    <p>{this.props.name}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Card>
        </Container>
    }
}
export default sessionsAttended;
