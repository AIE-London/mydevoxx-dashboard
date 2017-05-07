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
import * as firebase from "firebase";
import firebaseui from "firebaseui";

/*
  UI Components
 */

import Dashboard from "./components/Dashboard";
import Report from "./components/Report";
import TopRated from "./components/TopRated";
import LoginForm from "./components/LoginForm";

import NavButtons, { NavItems } from "./components/NavButtons";
import Branding from "./components/Branding";

/*
  API Integration pieces
 */
import FavoredTalk from "./api/favoredTalks";
import ScheduledTalk from "./api/scheduledTalks";
import SpeakerApi from "./api/speaker";
import TalkApi from "./api/talk";
import Talk from "./model/talk";
import Speaker from "./model/speaker";

/*
  Utilities
 */

import { recommendGlobal } from "./utils/recommendationEngine";

/*
  Styled Components
 */
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

const statsData = {
  minutes: 455,
  talks: 10,
  learning: ["Spring", "Java"],
  attendees: "~1000",
  speakers: ["Person One", "Person Two", "Person Three"]
};

let db;
//Define indexeddb instance/version
db = new Dexie("devoxx-db");
db.version(1).stores({ record: "id,uuid" });

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

const LogoutMobile = styled.button`
  background: transparent;
  border: none;
  padding: 1em;
  color: #2196F3;
`;

const LogoutButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  padding-left: 10px;
  font-size: 21px;
  color: #fff;
  &::before {
    content: '-'
    width: 20px;
    margin-right: 10px;
  }
`;

const fbConfig = {
  apiKey: "AIzaSyC2U3FefH8JEC6403QqM-igdtuM2LGy1y8",
  authDomain: "devoxx-dashboard.firebaseapp.com",
  databaseURL: "https://devoxx-dashboard.firebaseio.com",
  projectId: "devoxx-dashboard",
  storageBucket: "devoxx-dashboard.appspot.com",
  messagingSenderId: "594341536588"
};

firebase.initializeApp(fbConfig);

let fbui = new firebaseui.auth.AuthUI(firebase.auth());

class App extends Component {
  constructor() {
    super();
    this.state = {
      uuidPresent: false,
      navVisible: false,
      scheduledTalks: [],
      favouredTalks: [],
      talks: {},
      speakers: {},
      redirectLogin: false,
      globalRecommendations: []
    };
    //open connection to indexeddb - display error if connection failed
    db
      .open("devoxx-db")
      .then(() => {
        this.uuidExists().catch(error => {
          this.setState({ error: error });
        });
      })
      .catch(error => {
        alert("uuidDb could not be accessed: " + error);
      });

    this.userSignedIn = this.userSignedIn.bind(this);
    this.signInPage = this.signInPage.bind(this);
    this.uuidExists = this.uuidExists.bind(this);
    this.speakerInfo = this.speakerInfo.bind(this);
    this.logOut = this.logOut.bind(this);
    this.storeTalkDataInState = this.storeTalkDataInState.bind(this);
  }

  uuidExists = () => {
    return new Promise((resolve, reject) => {
      //open connection to indexeddb - display error if connection failed
      db.record &&
        db.record
          .get("0")
          .then(resolution => {
            if (resolution) {
              console.log(resolution);
              this.setState({ uuidPresent: true, redirectLogin: false });

              this.storeTalkDataInState(resolution.uuid);
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
    let speakerRequests = [];
    speakers.forEach(spkr => {
      if (!this.state.speakers[spkr.id]) {
        speakerRequests.push(
          SpeakerApi.getSpeaker(spkr.id).then(result => {
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
            newSpeaker[spkr.id] = speaker;
            this.setState({
              speakers: Object.assign({}, this.state.speakers, newSpeaker)
            });
          })
        );
      }
    });
    return Promise.all(speakerRequests);
  }

  storeTalkDataInState(uuid) {
    let favTalkPromise = FavoredTalk.getFavoredTalks(uuid).then(results => {
      this.setState({ favouredTalks: results.favored });
    });

    let schedTalkPromise = ScheduledTalk.getScheduledTalks(
      uuid
    ).then(results => {
      this.setState({ scheduledTalks: results.scheduled });
    });

    Promise.all([favTalkPromise, schedTalkPromise]).then(() => {
      let uniqueTalks = this.mergeUniqueArray(
        this.state.favouredTalks,
        this.state.scheduledTalks
      );

      let talkRequests = [];
      let speakerCounts = {};

      uniqueTalks.forEach(id => {
        talkRequests.push(
          TalkApi.getTalk(id).then(result => {
            let talk = new Talk(
              result.id,
              result.name,
              result.tracks,
              "en",
              result.description,
              result.speakers.map(speaker => speaker.id),
              result.videoURL
            );

            let newTalk = {};
            newTalk[talk.id] = talk;
            this.setState({
              talks: Object.assign({}, this.state.talks, newTalk)
            });
            result.speakers.forEach(speaker => {
              if (speakerCounts[speaker]) {
                speakerCounts[speaker]++;
              } else {
                speakerCounts[speaker] = 1;
              }
            });
            return this.speakerInfo(result.speakers);
          })
        );

        Promise.all(talkRequests).then(() => {
          // get top tracks

          // get top speakers
          let topSpeakers = Object.values(this.state.speakers)
            .map(speaker => ({
              speaker,
              count: speakerCounts[speaker]
            }))
            .sort((speakera, speakerb) => speakerb.count - speakera.count);

          // fetch recommendations by feeding array of talks/speakers in.
          recommendGlobal(
            Object.values(this.state.talks),
            topSpeakers
          ).then(result => {
            this.setState({
              globalRecommendations: result
            });
          });
        });
      });
    });
  }

  // Is this necessary? [TODO] Remove
  userSignedIn() {
    return this.uuidExists();
  }

  logOut() {
    firebase.auth().signOut().then(
      () => {
        db.record.clear().then(() => {
          console.log("DELETING");
          return this.uuidExists().catch(error => {
            this.setState({
              redirectLogin: true,
              navVisible: false
            });
          });
        });
      },
      error => {}
    );
  }

  // [TODO] Make inline
  signInPage() {
    return (
      <LoginForm
        onSignIn={this.userSignedIn}
        db={db}
        fbui={fbui}
        firebase={firebase}
      />
    );
  }

  // [TODO] Move to a utilities class
  mergeUniqueArray(firstArray, secondArray) {
    let mergedArray = firstArray.concat([secondArray]);
    return mergedArray
      .map(id => {
        return id.id;
      })
      .reduce((result, current) => {
        if (current && result.indexOf(current) < 0) {
          result.push(current);
        }
        return result;
      }, []);
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
            <div>
              <NavButtons />
              <LogoutButton className="desktopOnlyInline" onClick={this.logOut}>
                Log Out
              </LogoutButton>
            </div>
          </NavBar>
          <PrivateRoute
            path="/"
            exact
            uuidPresent={this.state.uuidPresent}
            render={props => (
              <Dashboard
                speakerData={this.state.speakers}
                talkData={this.state.talks}
                talkIDs={this.mergeUniqueArray(
                  this.state.favouredTalks,
                  this.state.scheduledTalks
                )}
                recommendations={this.state.globalRecommendations}
                stats={statsData}
                {...props}
              />
            )}
          />
          {this.state.redirectLogin && <Redirect to="/login" />}
          <Route path="/login" render={this.signInPage} />
          <PrivateRoute
            uuidPresent={this.state.uuidPresent}
            path="/report"
            render={props => {
              return (
                <Report
                  reportStats={statsData}
                  speakerData={this.state.speakers}
                  talkData={this.state.talks}
                  talks={this.mergeUniqueArray(
                    this.state.favouredTalks,
                    this.state.scheduledTalks
                  )}
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
            )).concat([
              <LogoutMobile onClick={this.logOut}>Log Out</LogoutMobile>
            ])}
          />
        </Page>
      </DevoxxRouter>
    );
  }
}
export default App;
