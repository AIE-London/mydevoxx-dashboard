import React, { Component } from 'react';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import Dashboard from './components/Dashboard';
import Report from './components/Report';
import Talk from './components/Talk';
import TopRated from './components/TopRated';

class App extends Component {

  render() {

    return (
        <Router history={browserHistory}>
          <div>
            <Route path='/report' component={Report} />
            <Route path='/talk/:id' component={Talk} />
            <Route path='top-rated' component={TopRated} />
            <p>App page</p>
          </div>
        </Router>
    );
  }
}

export default App;
