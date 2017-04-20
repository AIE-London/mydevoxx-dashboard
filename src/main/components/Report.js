import React, {Component} from 'react';
import {Row, Col} from 'react-flexbox-grid';
import TalkCard from './TalkCard';
import SpeakerCard from './SpeakerCard';
import ReportStats from './ReportStats';

class Report extends Component {

  render() {
        let {minutes, talks, learning, attendees} = this.props.route.reportStats;

        return (
            <div className="Report">
                <Row center="xs">
                    <Col xs={10}>
                        <ReportStats minutes={minutes} talks={talks} learning={learning}
                                     attendees={attendees}/>
                    </Col>
                </Row>
                <Row center="xs">
                    <Col xs={10}>
                        <TalkCard talk={this.props.route.talk}/>
                    </Col>
                    <Col xs={10}>
                        <SpeakerCard speaker={this.props.route.speaker}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Report;
