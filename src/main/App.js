import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  browserHistory
} from "react-router-dom";
import SideNav from "react-simple-sidenav";
import styled from "styled-components";
import Dexie from "dexie";

/*
  UI Components
 */

import Dashboard from "./components/Dashboard";
import Report from "./components/Report";
import TopRated from "./components/TopRated";
import UserEmail from "./components/UserEmail";
import NavButtons, { NavItems } from "./components/NavButtons";
import Branding from "./components/Branding";

/*
  API Integration pieces
 */
import FavoredTalk from "./api/favoredTalks";
import ScheduledTalk from "./api/scheduledTalks";
import SpeakerApi from "./api/speakers";

import Talk from "./model/talk";
import Speaker from "./model/speaker";

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

const globalRecommendations = [
  {
    name: "Intro to Devoxx",
    url: "http://devoxx.co.uk",
    source: "tracks"
  },
  {
    name: "Intro to Devoxx2",
    url: "http://devoxx.co.uk",
    source: "tracks"
  },
  {
    name: "Intro to Devoxx3",
    url: "http://devoxx.co.uk",
    source: "tracks"
  },
  {
    name: "Intro to Devoxx4",
    url: "http://devoxx.co.uk",
    source: "tracks"
  }
];

let speaker1 = new Speaker(
  "da2efaefc17e080c53baff7e6525e65e87ab9774",
  "I have almost 10 years of experience programming in Java. " +
    "I have also a long experience in big data and recommendation " +
    "systems. Currently, I am the project leader of Walkmod, an open " +
    "source tool to apply Java code conventions and also the organizer " +
    "of Legacy Code Rocks Barcelona meetup.",
  ["MXR-2678"],
  "Walkmod",
  "Pau Fernández",
  "Raquel",
  "http://www.walkmod.com",
  "https://lh5.googleusercontent.com/-gpyd1u760zw/AAAAAAAAAAI/AAAAAAAAAAA/40NTLE5649A/photo.jpg",
  "@raquelpau"
);

let gitTalk = new Talk(
  "MXR-2678",
  "Git Workflow Strategies for Technical Debt Management",
  ["method_archi"],
  "en",
  "The technical debt metaphor is gaining significant traction in " +
    "the agile development community as a way to understand and communicate " +
    "those issues related to accepting bad programming practices in order to " +
    "achieve fast results (e.g a deadline). However, the idea of getting fast " +
    "results becomes an illusion, since the cost of building software increases " +
    "over the time.  \r\n\r\nIn order to achieve a good technical debt management, " +
    "agile methodologies suggest to measure it and add an specific entry in the sprint " +
    "backlog to fix it incrementally and to apply continuous inspection to block " +
    "new code quality issues. In this session, we will explore the different " +
    "categories of technical debt and how can we benefit from Git workflow to " +
    "reduce part of it incrementally and safely.",
  ["da2efaefc17e080c53baff7e6525e65e87ab9774"],
  null
);

const DevoxxSpeakers = {
  da2efaefc17e080c53baff7e6525e65e87ab9774: speaker1
};
const DevoxxTalks = {
  "MXR-2678": gitTalk
};

const UserScheduledFavoured = ["MXR-2678"];

const statsData = {
  minutes: 455,
  talks: 10,
  learning: ["Spring", "Java"],
  attendees: "~1000",
  speakers: ["Person One", "Person Two", "Person Three"]
};

let db;

const PrivateRoute = ({
  uuidPresent,
  component: Component,
  render: Render,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (uuidPresent) {
        if (Component) {
          return <Component {...props} />;
        } else if (Render) {
          return Render(props);
        } else {
          return <div>Error</div>;
        }
      } else {
        return <Redirect to="/login" />;
      }
    }}
  />
);
const NavLink = styled(Link)`
  display: block;
  box-sizing: border-box;
  padding: 1em;
  width: 100%;
  &:hover {
    background: rgba(255, 156, 25, 0.2);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  & h1 {
    margin-left: 0.5em;
  }
`;

const DevoxxRouter = styled(Router)`
  flex: 1;
  display: flex;
`;

const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      uuidPresent: true,
      navVisible: false,
      scheduledTalks: [],
      favouredTalks: []
    };
    //Define indexeddb instance/version
    db = new Dexie("devoxx-db");
    db.version(1).stores({ record: "id,uuid" });

    //open connection to indexeddb - display error if connection failed
    db.open().catch(error => {
      alert("uuidDb could not be accessed: " + error);
    });

    this.userSignedIn = this.userSignedIn.bind(this);
    this.signInPage = this.signInPage.bind(this);
    this.uuidExists = this.uuidExists.bind(this);
    this.uuidExists().catch(error => {
      this.setState({ error: error });
    });
  }

  uuidExists = () => {
    return new Promise((resolve, reject) => {
      //open connection to indexeddb - display error if connection failed
      db.open("devoxx-db").catch(error => {
        alert("uuidDb could not be accessed: " + error);
      });
      db.record &&
        db.record
          .get("0")
          .then(resolution => {
            if (resolution) {
              this.setState({ uuidPresent: true });
              resolve();
            } else {
              throw new Error("No UUID");
            }
          })
          .catch(error => {
            this.setState({ uuidPresent: false });
            reject(error);
          });
    });
  };

  speakerInfo(speakers) {
    speakers.forEach(id => {
      if (!this.state.speakers[id]) {
        SpeakerApi.getSpeaker(id).then(result => {
          console.log(result);
          let speaker = new Speaker(
            result.uuid,
            result.bio,
            result.acceptedTalkIDs,
            result.company,
            result.lastName,
            result.firstName,
            result.blog,
            result.avatarURL,
            result.twitter
          );
          let newSpeaker = {};
          newSpeaker[id] = speaker;
          this.setState({
            speakers: Object.assign({}, this.state.speakers, newSpeaker)
          });
          console.log(this.state.speakers);
        });
      }
    });
  }

  userSignedIn(uuid) {
    FavoredTalk.getFavoredTalks(uuid).then(results => {
      console.log(results);
      this.setState({ favouredTalks: results });
    });

    ScheduledTalk.getScheduledTalks(uuid).then(results => {
      console.log(results);
      this.setState({ scheduledTalks: results });
    });

    return this.uuidExists();
  }

  signInPage() {
    return <UserEmail onSignIn={this.userSignedIn} db={db} />;
  }

  render() {
    return (
      <DevoxxRouter history={browserHistory}>
        <Page>
          <NavBar>
            <TitleContainer>
              <h2
                id="nav-icon"
                onClick={() => this.setState({ navVisible: true })}
                className="mobileOnly"
              />
              <h1>MyDevoxxReport</h1>
            </TitleContainer>
            <NavButtons />
          </NavBar>
          <PrivateRoute
            path="/"
            exact
            uuidPresent={this.state.uuidPresent}
            render={props => (
              <Dashboard
                talkData={DevoxxTalks}
                speakerData={this.state.speakers}
                talkIDs={UserScheduledFavoured}
                recommendations={globalRecommendations}
                stats={statsData}
                {...props}
              />
            )}
          />
          <Route path="/login" render={this.signInPage} />
          <PrivateRoute
            uuidPresent={this.state.uuidPresent}
            path="/report"
            render={props => {
              return (
                <Report
                  reportStats={statsData}
                  speakerData={this.state.speakers}
                  talkData={DevoxxTalks}
                  talks={UserScheduledFavoured}
                />
              );
            }}
          />
          <PrivateRoute
            path="/talk/:id"
            uuidPresent={this.state.uuidPresent}
            component={Talk}
          />
          <PrivateRoute
            path="/top-rated"
            uuidPresent={this.state.uuidPresent}
            component={TopRated}
          />

          <Branding />

          <SideNav
            className="mobileOnly"
            showNav={this.state.navVisible}
            onHideNav={() => this.setState({ navVisible: false })}
            title={<div>MyDevoxx Report 2017</div>}
            titleStyle={{ backgroundColor: "#ff9e19" }}
            itemStyle={{ padding: 0, margin: 0, listStyle: "none" }}
            items={NavItems.map(item => (
              <NavLink
                to={item.link}
                key={item.name}
                onClick={e => this.setState({ navVisible: false })}
              >
                {item.name}
              </NavLink>
            ))}
          />
        </Page>
      </DevoxxRouter>
    );
  }
}
export default App;
