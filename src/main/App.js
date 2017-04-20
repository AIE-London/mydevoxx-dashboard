import React, {Component} from 'react';
import {BrowserRouter as Router, Route, browserHistory} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Report from './components/Report';
import Talk from './components/Talk';
import TopRated from './components/TopRated';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import NavButtons from './components/NavButtons';

import testImage from '../test/snapshot/images/test-image.jpeg';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#ff9e19',
        textColor: '#fff'
    },
    appBar: {
        height: '75'
    }
});

const talkDetail =
    {
        dayNo: 'One',
        sTime: '10:00',
        room: 'Mezzanine',
        title: 'Welcome to Devoxx 2017',
        description: 'Join the organisers of Devoxx UK and great keynote ' +
        'speakers for inspring stories in 20 minute segments.',
        rating: 4,
        topTracks: [
            'Java',
            'Devoxx',
            'Spring',
        ],
        notes: 'Lorem ipsum dolor sit amet, everti quaestio mel ea. Ex eos ' +
        'volutpat qualisque. Sale tantas cotidieque quo ut, ad nostro consectetuer' +
        ' nec. Feugiat qualisque quo an. Labores officiis te nam.',
        review: {
            name: 'Test User',
            comment: 'Great session, thanks for organising. Looking forward to the next one!',
            image: testImage
        },
        speakers: [
            {
                name: 'Test Speaker',
                company: 'Capgemini',
                blog: 'personalblog.com',
                talks: [
                    'Intro to Devoxx (Room 1 - 11:45)',
                    'Intro to Devoxx 2 (Room 2 - 13:45)'
                ]
            }
        ]
    };


const reportStatsData =
    {
        minutes: 455,
        talks: 10,
        learning: "Spring, Java",
        attendees: 435
    };

class App extends Component {

    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Router history={browserHistory}>
                        <div>
                            <AppBar
                                title="MyDevoxx"
                                iconElementRight={<NavButtons />}/>
                            <Route path='/' component={Dashboard}/>
                            <Route path='/report' render={props => <Report reportStats={reportStatsData}
                                                                                      talk={talkDetail} />}/>
                            <Route path='/talk/:id' component={Talk}/>
                            <Route path='/top-rated' component={TopRated}/>
                        </div>
                    </Router>
                </div>
            </MuiThemeProvider>
        );
    }
}
injectTapEventPlugin();

export default App;