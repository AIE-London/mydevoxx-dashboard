import React, { Component } from 'react';
import './App.css';

import SessionView from './components/SessionView';




class App extends Component {
  render() {
    return (
      <SessionView dayNo="One" sTime="10:00" room="GIANT HALLWAY">

      </SessionView>
    );
  }
}

export default App;