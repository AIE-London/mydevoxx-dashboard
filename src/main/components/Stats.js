/**
 * Created by DLINDSAY on 05-Apr-17.
 */
import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Card from './Card';
import styled from 'styled-components';
import {CommaList, CommaListItem} from './CommaList'

const Container = styled.div`
    width: 400px;
    height: 400px;
`;

const StatHeader = styled.h2`
    
    font-family: helvetica;
`;

class Stats extends React.Component {
    render() {
        return <Container><Card center="xs">
            <Col xs={10}>
                <Col xs={6}>
                    <Row start="xs">
                        <h1>My Stats</h1>
                    </Row>
                </Col>

                <Row start="xs">
                    <Col xs={12}>

                        <StatHeader>Top Tracks:</StatHeader>
                        <div style={{textAlign: 'center'}}>
                            <CommaList >
                                {
                                    this.props.tracks.map( function(track) {
                                        return <CommaListItem key={track}>{track}</CommaListItem>
                                    })
                                }
                            </CommaList>
                        </div>

                        <StatHeader>Top Speakers:</StatHeader>

                        <div style={{textAlign: 'center'}}>
                            <CommaList>
                                {
                                    this.props.speakers.map( function(speaker) {
                                        return <CommaListItem key={speaker}>{speaker}</CommaListItem>
                                    })
                                }
                            </CommaList>
                        </div>
                    </Col>
                </Row>
            </Col>

        </Card></Container>
    }
}

export default Stats;