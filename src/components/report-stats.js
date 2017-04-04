/**
 * Created by TSADLER on 03/04/2017.
 */
import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

class reportStats extends React.Component {
    render() {
        return <div>
			<h1>Hello</h1>
			<p>Dan</p>

			<h1>Hello</h1>
			<p>Caner</p>

			<h1>Hello</h1>
			<p>Tom</p>

			<h1>Hello</h1>
			<p>Other Dan</p>

				<Row>
					<Col xs />
					<Col xs />
				</Row>
				<Row>
					<Col xs />
					<Col xs />
					<Col xs />
				</Row>
		</div>;
    }
}

export default reportStats;