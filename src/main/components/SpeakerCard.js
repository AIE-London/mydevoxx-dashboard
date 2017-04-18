import React from 'react';
import {Row, Col} from 'react-flexbox-grid';
import Title from './SpeakerTitle';
import Default from './defaultIcon.png';
import styled from 'styled-components';

const Card2 = styled(Row)`
  background: #FAFAFA;
  border-radius: 2px;
  padding: 0;
  font-family: Helvetica;
  box-sizing: border-box;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  margin-bottom: 50px;
`;

const ImgCircle = styled.img`
    borderRadius: 50%;
    width: 50px;
    height: 50px;
    marginTop: 20px;
    border: 5px solid white;
`;

const Blog = styled.div`
    paddingLeft: 30px;
    paddingBottom: 10px;
    paddingTop: 2px;
    opacity: 0.6; 
    margin-bottom: 17px;
`;

const Container = styled.div`
    width: 70%;
    paddingBottom: 10px;
    text-align: left;
    margin-left : 20px;
`;

class SpeakerCard extends React.Component {

    render() {
        return <Card2>
            <Container >
                <Row>
                    <Col>
                        <ImgCircle src={Default}></ImgCircle>
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
                            <Blog>
                                {
                                    this.props.talks.map(function (talk) {
                                        return <li key={talk}>{talk}</li>
                                    })
                                }
                            </Blog>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </Card2>;
    }
}

export default SpeakerCard;