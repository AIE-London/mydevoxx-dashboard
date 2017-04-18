/**
 * Created by DLINDSAY on 03-Apr-17.
 */
import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Title from './SpeakerTitle';
import Card from './Card';
import Default from './defaultIcon.png';
import styled from 'styled-components';

const ImgCircle = styled.img`
    borderRadius: 50%;
    width: 50px;
    height: 50px;
    marginTop: 20px;
    border: 5px solid white;
`;

const Blog = styled.div`
    paddingLeft: 30px;
    paddingBottom: 10px,;
    paddingTop: 2px;
`;

class SpeakerCard extends React.Component {

    render() {
        return <Card><Grid fluid>
            <Row>
                <Col>
                    <ImgCircle src={Default} ></ImgCircle>
                </Col>
                <Col xs>
                    <Title name={this.props.name} company={this.props.company}/>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <div>Personal Blog:</div>
                    <Blog>{this.props.blog}</Blog>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <div>Other Talks:</div>
                    <ul>
                        {
                            this.props.talks.map( function(talk) {
                                return <li key={talk}>{talk}</li>
                            })
                        }

                    </ul>
                </Col>
            </Row>

        </Grid> </Card>;

    }
}


export default SpeakerCard;