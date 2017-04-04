/**
 * Created by dan on 04/04/2017.
 */
import React, { Component } from 'react';
import Card from '../Card';
import logo from '../../logo.svg';

class TalkCard extends Component {
  render() {
    return (
      <Card>
        <h2 id="title">{ this.props.title }</h2>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </Card>
    );
  }
}

export default TalkCard;
