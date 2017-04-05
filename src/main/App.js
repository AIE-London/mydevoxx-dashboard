import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h2 className="App-day">Day {this.props.dayNo}</h2>
          <h2 className="App-time">{this.props.sTime} - {this.props.room}</h2>
          <h2 className="App-time">Speakers: </h2>
      </div>
    );
  }
}

export default App;