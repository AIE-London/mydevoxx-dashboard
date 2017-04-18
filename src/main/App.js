import React, {Component} from 'react';
import {BrowserRouter as Router, Route, browserHistory} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Report from './components/Report';
import Talk from './components/Talk';
import TopRated from './components/TopRated';
import styled from 'styled-components';

import NavButtons from './components/NavButtons';

const NavBar = styled.nav`
  display: flex;
  width: 100%;
  height: 75px;
  background: #ff9e19`;

const NavBarTitle = styled.h1`
flex: 1`;

class App extends Component {

    render() {

        return (
            <Router history={browserHistory}>
                <div>
                    <NavBar>
                        <NavBarTitle>MyDevoxx</NavBarTitle>
                        <NavButtons/>
                    </NavBar>
                    <Route path='/' component={Dashboard}/>
                    <Route path='/report' component={Report}/>
                    <Route path='/talk/:id' component={Talk}/>
                    <Route path='/top-rated' component={TopRated}/>
                </div>
            </Router>
        );
    }
}

export default App;
