import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  browserHistory
} from "react-router-dom";
import SideNav from "react-simple-sidenav";
import styled from "styled-components";

import Dashboard from "./components/Dashboard";
import Report from "./components/Report";
import Talk from "./components/Talk";
import TopRated from "./components/TopRated";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import NavButtons from "./components/NavButtons";

import testImage from "../test/snapshot/images/test-image.jpeg";

const NavBar = styled.div`
  background: #ff9e19;
  height: 75px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2em;
  & h1 {
    color: #fff;
    font-weight: 200;
    font-size: 25px;
  }
`;

const talkDetail = [
  {
    dayNo: "One",
    sTime: "10:00",
    room: "Mezzanine",
    title: "Welcome to Devoxx 2017",
    description: "Join the organisers of Devoxx UK and great keynote " +
      "speakers for inspring stories in 20 minute segments.",
    rating: 4,
    topTracks: ["Java", "Devoxx", "Spring"],
    notes: "Lorem ipsum dolor sit amet, everti quaestio mel ea. Ex eos " +
      "volutpat qualisque. Sale tantas cotidieque quo ut, ad nostro consectetuer" +
      " nec. Feugiat qualisque quo an. Labores officiis te nam.",
    review: {
      name: "Test User",
      comment: "Great session, thanks for organising. Looking forward to the next one!",
      image: testImage
    },
    speakers: [
      {
        name: "Test Speaker",
        company: "Capgemini",
        blog: "personalblog.com",
        talks: [
          "Intro to Devoxx (Room 1 - 11:45)",
          "Intro to Devoxx 2 (Room 2 - 13:45)"
        ]
      }
    ]
  }
];

const reportStatsData = {
  minutes: 455,
  talks: 10,
  learning: ["Spring", "Java"],
  attendees: "~1000"
};

class App extends Component {
  constructor() {
    super();
    this.state = { navVisible: true };
  }

  render() {
    return (
      <div>
        <Router history={browserHistory}>
          <div>
            <NavBar>
              <h1>MyDevoxxReport</h1>
              <NavButtons />
            </NavBar>
            <Route path="/" component={Dashboard} />
            <Route
              path="/report"
              render={function(props) {
                return (
                  <Report reportStats={reportStatsData} talks={talkDetail} />
                );
              }}
            />
            <Route path="/talk/:id" component={Talk} />
            <Route path="/top-rated" component={TopRated} />
          </div>
        </Router>
        <SideNav
          showNav={!this.state.navVisible}
          onHideNav={() => this.setState({ navVisible: false })}
          title={<div>Hello octo <img src="git-mark.png" width="26" /></div>}
          titleStyle={{ backgroundColor: "#2196F3" }}
          items={[
            <a href="https://github.com/gauravchl/react-simple-sidenav">
              View Source on github
            </a>,
            <a href="https://www.npmjs.com/package/react-simple-sidenav">
              Install via npm
            </a>,
            <a href="https://gauravchl.github.io/react-simple-sidenav/example">
              demo
            </a>
          ]}
        />
      </div>
    );
  }
}
export default App;
