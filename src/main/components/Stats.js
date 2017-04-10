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
    opacity: 0.8;
    font-family: helvetica;
`;

class Stats extends React.Component {
    render() {
        return <Container><Card center="xs"> {/* Wraps the Card component within the Container component */}
            <Col xs={10}> {/* creates a column that is 10 out of 12 sections wide */}
                <Col xs={6}> {/* creates a column that is 6 out of 12 sections wide */}
                    <Row start="xs"> {/* creates a row that aligns the object within it to the left */}
                        <h1>My Stats</h1>
                    </Row>
                </Col>

                <Row start="xs"> {/* creates a row that aligns the object within it to the left */}
                    <Col xs={12}> {/* creates a column that is 12 out of 12 sections  */}

                        <StatHeader>Top Tracks:</StatHeader> {/* creates a header using the StatHeader styled h2 format */}
                        <div style={{textAlign: 'center'}}> {/* creates a div which aligns the text within it to the centre */}
                            <CommaList > {/* creates a ul element using the CommaList styled ul format */}
                                {
                                    this.props.tracks.map( function(track) { //returns a styled li element for each of the items in the tracks property array
                                        return <CommaListItem key={track}>{track}</CommaListItem>
                                    })
                                }
                            </CommaList>
                        </div>

                        <StatHeader>Top Speakers:</StatHeader> {/* creates a header using the StatHeader styled h2 format */}

                        <div style={{textAlign: 'center', paddingBottom: 15}}> {/* creates a div that aligns all text within it to the centre and adds 15 pixels of padding to the bottom */}
                            <CommaList> {/* creates a ul element using the CommaList styled ul format */}
                                {
                                    this.props.speakers.map( function(speaker) {
                                        return <CommaListItem key={speaker}>{speaker}</CommaListItem> //returns a styled li element for each of the items in the tracks property array
                                    } )
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