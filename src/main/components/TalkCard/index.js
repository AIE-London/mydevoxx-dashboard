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
        <divgit st>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </divgit>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </Card>
    );
  }
}

export default TalkCard;
