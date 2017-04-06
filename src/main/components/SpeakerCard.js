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

const Container = styled.div`
    width: 400px;
    height: 400px;
    
`;

class speakerCard extends React.Component {

    render() {
        return <Card> <Grid>

            <Row>
                <Col>
                    <ImgCircle src={Default} ></ImgCircle>
                </Col>
                <Col xs>
                    <Title name={this.props.name} company={this.props.company}/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <div>Personal Blog:</div>
                    <Blog>{this.props.blog}</Blog>
                </Col>
            </Row>

            <Row>
                <Col>
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

            </Grid></Card>;


    }
}

/*
 return <Card> <Grid fluid>

 <Row style={{textAlign: left}}>
 <Col>

 </Col>
 <Col xs>

 </Col>
 </Row>

 <Row start="xs">
 <Col>
 <div>Personal Blog:</div>
 <Blog>{this.props.blog}</Blog>
 </Col>
 </Row>

 <Row start="xs">
 <Col>
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

 </Grid></Card>;
 */


export default speakerCard;