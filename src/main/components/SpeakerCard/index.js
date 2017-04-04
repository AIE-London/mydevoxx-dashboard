/**
 * Created by DLINDSAY on 03-Apr-17.
 */
import React from 'react';
//import StyleSheet from 'react-style';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Title from '../SpeakerTitle';
import Card from '../Card';


const circle = {
        borderRadius: 50,
        width: 50,
        height: 50,
        background: 'green'
};

const flexContainer = {
        flex: 1

};

class speakerCard extends React.Component {

    render() {
        return <Card><Grid fluid>
            <Row>
                <Col xs={6} md={2} >
                    <Row around="xs" middle="xs">
                        <div style={circle}></div>
                        <Title name={this.props.name} company={this.props.company}/>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <div>Personal Blog:</div>
                    <div style={{paddingLeft: 30, paddingBottom: 10, paddingTop: 2}}>{this.props.blog}</div>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <div>Other Talks:</div>
                    <ul>
                        {
                            this.props.talks.map( function(talk) {
                                return <li>{talk}</li>
                            })
                        }

                    </ul>
                </Col>
            </Row>

        </Grid> </Card>;

    }
}
/*
class speakerCard extends React.Component {
    render() {
        return <div style={flexContainer}>
            <div style={circle}></div>
            <div>name goes here</div>
            <div>title goes here and there</div>
            <ul>
                <li>info 1 here</li>
                <li>info 2 here</li>
                <li>info 3 here</li>
            </ul>
        </div>;

    }
}
*/


export default speakerCard;