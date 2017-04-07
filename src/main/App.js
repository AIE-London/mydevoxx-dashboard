import React, { Component } from 'react';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Report from './components/Report';
import Talk from './components/Talk';
import TopRated from './components/TopRated';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import NavButtons from './components/NavButtons';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#ff9e19',
    textColor: '#fff'
  },
  appBar: {
    height: '75'
  }
});

class App extends Component {

  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Router history={browserHistory}>
            <div>
              <AppBar
                title="MyDevoxx"
                iconElementRight={<NavButtons />} />
              <Route path='/' component={Dashboard} />
              <Route path='/report' component={Report} />
              <Route path='/talk/:id' component={Talk} />
              <Route path='/top-rated' component={TopRated} />
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}
injectTapEventPlugin();

export default App;
