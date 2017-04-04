/**
 * Created by DLINDSAY on 03-Apr-17.
 */
import React from 'react';
//import StyleSheet from 'react-style';
import { Grid, Row, Col } from 'react-flexbox-grid';

const circle = {
        borderRadius: 50,
        width: 40,
        height: 40,
        background: 'green'
};

const flexContainer = {
        flex: 1

};

class speakerCard extends React.Component {
    render() {
        return <Grid fluid>
            <Row>
                <Col xs={6} md={3} style={{background: 'purple'}}>
                    Hello, world!
                </Col>
            </Row>

        </Grid>;

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