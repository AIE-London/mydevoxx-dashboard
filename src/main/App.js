import ReactGA from "react-ga";
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
import * as firebase from "firebase";
import firebaseui from "firebaseui";
import Notifications, { notify } from "react-notify-toast";

/*
  UI Components
 */

import Dashboard from "./components/Dashboard";
import Report from "./components/Report";
import LoginForm from "./components/LoginForm";

import NavButtons, { NavItems } from "./components/NavButtons";
import Branding from "./components/Branding";

/*
  API Integration pieces
 */
import FavoredTalk from "./api/favoredTalks";
import ScheduledTalk from "./api/scheduledTalks";
import SpeakerApi from "./api/speaker";
import DaySchedule from "./api/daySchedule";

/*
  Model
 */
import Talk from "./model/talk";
import Speaker from "./model/speaker";

/*
  Utilities
 */
import { mergeUniqueArrayByID } from "./utils/arrayUtils";
import {
  getTopTracks,
  indexScheduleByTalkID,
  getTimeForTalk
} from "./utils/talkUtils";
import { getTalk, mapIDArrayToValue } from "./utils/apiOrchestration";
import { recommendGlobal } from "./utils/recommendationEngine";
import debugLog from "./utils/debugLog";
import uuidStorage from "./utils/uuidStorage";
import YoutubeVid from "./components/YoutubeVid";
uuidStorage.init();

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
      globalRecommendations: [],
      stats: {},
      videoID: null
    };

    if (["production", "integration"].indexOf(process.env.NODE_ENV) >= 0) {
      ReactGA.initialize("UA-98791923-1");
    }

    uuidStorage
      .openDB()
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
    this.getSpeakersForTalks = this.getSpeakersForTalks.bind(this);
    this.speakerInfo = this.speakerInfo.bind(this);
    this.logOut = this.logOut.bind(this);
    this.storeTalkDataInState = this.storeTalkDataInState.bind(this);
  }

  logPageView() {
    if (["production", "integration"].indexOf(process.env.NODE_ENV) >= 0) {
      ReactGA.set({ page: window.location.pathname });
      ReactGA.pageview(window.location.pathname);
    }
  }

  uuidExists = () => {
    return uuidStorage
      .getUUID()
      .then(value => {
        debugLog.log("Retrieved UUID");
        this.setState({ uuidPresent: true, redirectLogin: false });
        this.storeTalkDataInState(value.uuid);
      })
      .catch(error => {
        this.setState({ uuidPresent: false });
        throw new Error("No UUID - caught error");
      });
  };

  speakerInfo(speakers) {
    // Go get all the speakers and return a promise for when you're done
    return Promise.all(
      speakers.map(speakerId => {
        // If not already in state
        if (!this.state.speakers[speakerId]) {
          // Call API
          return SpeakerApi.getSpeaker(speakerId)
            .then(result => {
              // Take result - construct object
              return new Speaker(
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
            })
            .then(speaker => {
              // Then - get all of the speaker's
              // talks and add their data in if we don't have them yet
              return (
                this.getTalks(
                  speaker.acceptedTalkIDs,
                  this.state.scheduleByTalk
                )
                  // Once that's done - pass the speaker object onto the next promise
                  .then(() => speaker)
              );
            })
            .then(speaker => {
              // Construct new state.speakers object
              let newSpeaker = {};
              // Add speaker at given id
              newSpeaker[speakerId] = speaker;
              // Update state
              this.setState({
                speakers: Object.assign({}, this.state.speakers, newSpeaker)
              });
            });
        } else {
          // Just return something to resolve the promise - not a breaking issue
          return true;
        }
      })
    );
  }

  getTalksByUUID(uuid) {
    let favTalkPromise = FavoredTalk.getFavoredTalks(uuid)
      .then(results => {
        this.setState({ favouredTalks: results.favored });
        console.log(results.favored);
      })
      .catch(error => {
        debugLog.log(error.message);
        notify.show(
          "Failed to retrieve favoured talks. Refresh to retry.",
          "error"
        );
      });

    let schedTalkPromise = ScheduledTalk.getScheduledTalks(uuid)
      .then(results => {
        this.setState({ scheduledTalks: results.scheduled });
        console.log(results.scheduled);
      })
      .catch(error => {
        notify.show(
          "Failed to retrieve scheduled talks. Refresh to retry.",
          "error"
        );
      });

    return Promise.all([schedTalkPromise, favTalkPromise]);
  }

  getSchedules() {
    // Declare empty arrays for each day.
    let thursday = [];
    let friday = [];

    return (
      new Promise((resolve, reject) => {
        // Return a promise that will wait for both schedules to be returned
        Promise.all([
          // Get all slots for thursday schedule
          DaySchedule.getSlots("thursday").then(result => {
            // replace array above
            thursday = result;
          }),
          // Get all slots for friday schedule
          DaySchedule.getSlots("friday").then(result => {
            friday = result;
          })
        ])
          .then(resolve)
          .catch(error => {
            // Catch any errors that fall out
            debugLog.log("[ERROR] Recieving schedules. Carrying on.");
            // As this isn't a critical action - just resolve if a request fails
            resolve();
          });
      })
        // Then return a constructed object with the two schedules in.
        .then(() => ({
          thursday,
          friday
        }))
    );
  }

  calcStats(talks) {
    // Declare speaker counts object - for temp usage during
    // speaker usage counting
    let speakerCounts = {};
    // Declare value for minutes - will increment as necessary
    // during iteration to count total time
    let timeMinutes = 0;

    // Declare max speaker count as 3
    let count = 3;

    talks.forEach(talk => {
      // Iterate through talks. Add each instance of a speaker to their count
      if (talk) {
        talk.speakers.forEach(speaker => {
          // For each speaker - check we've got an entry for them
          if (speakerCounts[speaker]) {
            // If so - increment it
            speakerCounts[speaker]++;
          } else {
            // If not - set them up at 1 count for now
            speakerCounts[speaker] = 1;
          }
        });
      }
      // Whilst we're iterating - get time for talk and add to total time
      timeMinutes += getTimeForTalk(talk);
    });

    // Calculate top tracks
    let topTracks = getTopTracks(talks);

    // Identify top speakers
    let topSpeakers = Object.values(this.state.speakers)
      .map(speaker => ({
        speaker,
        count: speakerCounts[speaker]
      }))
      .sort((speakera, speakerb) => speakerb.count - speakera.count)
      .filter(speaker => count-- > 0);

    // Update state to contain appropriate stats
    this.setState({
      stats: {
        minutes: timeMinutes,
        talks: talks.length,
        learning: topTracks.map(track => track.name),
        attendees: "~1000",
        speakers: topSpeakers.map(speaker => speaker.speaker.name)
      }
    });

    // fetch recommendations by feeding array of talks/speakers in.
    recommendGlobal(topTracks, topSpeakers).then(result => {
      // store our global recommendations in state
      this.setState({
        globalRecommendations: result
      });
    });
  }

  getTalks(arrayOfTalkIDs, schedule) {
    // Setup empty array to catch promises in
    let talkRequests = [];
    // Iterate through and setup a request for each
    arrayOfTalkIDs.forEach(id => {
      // Make request
      let request = getTalk(id)
        .then(talk => {
          // try and add scheduling details to talk
          if (schedule[talk.id]) {
            talk.room = schedule[talk.id].room;
            talk.startTime = new Date(schedule[talk.id].fromTime);
            talk.endTime = new Date(schedule[talk.id].toTime);
          }
          // return talk to pass it onto the next function in the promise chain
          return talk;
        })
        // then store talk in state
        .then(talk => {
          // Create a blank object
          let newTalk = {};
          // Set the value of the id to be the talk
          newTalk[talk.id] = talk;
          // Merge object with talks object in state and update state
          this.setState({
            talks: Object.assign({}, this.state.talks, newTalk)
          });
        });
      // Push each request into array of requests
      talkRequests.push(request);
    });
    // Return a promise that will resolve when we're done
    return Promise.all(talkRequests);
  }

  getSpeakersForTalks(talks) {
    // Iterate through all talks - fire off requests for speakers
    return Promise.all(
      talks.map(talk => {
        if (talk) {
          return this.speakerInfo(talk.speakers);
        }
      })
    );
  }

  storeTalkDataInState(uuid) {
    // Declare empty schedules
    let thursSchedule, friSchedule;

    // Get all talks given a UUID
    let talksPromise = this.getTalksByUUID(uuid);
    // Get whole devoxx 2017 schedule
    let schedulesPromise = this.getSchedules().then(result => {
      // Grab the two days schedules from the result and populate our two variables with them
      thursSchedule = result.thursday;
      friSchedule = result.friday;
    });
    // Once you've got talks and schedules....
    Promise.all([talksPromise, schedulesPromise])
      .then(() => {
        // Join the schedules together
        let schedule = thursSchedule.concat(friSchedule);
        // Use existing function to convert array into indexed object
        let scheduleByTalk = indexScheduleByTalkID(schedule);
        // Add into state
        this.setState({ scheduleByTalk });

        // Get just the unique talks by merging the arrays
        // and filtering out the duplicates by their id
        let uniqueTalks = mergeUniqueArrayByID(
          this.state.favouredTalks,
          this.state.scheduledTalks
        );

        // Now we know the unique ones. Go get our talks
        return (
          this.getTalks(uniqueTalks, this.state.scheduleByTalk)
            // Once complete - pass unique talks to next in chain
            .then(() => uniqueTalks)
        );
      })
      .then(uniqueTalks => {
        // Map array of talk IDs into their values....
        return mapIDArrayToValue(uniqueTalks, this.state.talks);
      })
      .then(talks => {
        // Once we're done with all of our talk requests...
        return (
          this.getSpeakersForTalks(talks)
            // Once complete - pass talks to next in chain
            .then(() => talks)
        );
      })
      .then(talks => {
        // Once we're done with all of our talk requests...
        return this.calcStats(talks);
      });
  }

  userSignedIn() {
    return this.uuidExists().catch(() => {
      notify.show("Login persistence failed, please try again.", "error");
    });
  }

  logOut() {
    firebase.auth().signOut().then(
      () => {
        uuidStorage.clear().then(() => {
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
        storeUUID={uuidStorage.storeUUID}
        fbui={fbui}
        firebase={firebase}
      />
    );
  }

  render() {
    return (
      <DevoxxRouter history={browserHistory} onUpdate={this.logPageView}>
        <Page>
          <NavBar>
            <TitleContainer>

              {this.state.uuidPresent &&
                <h2
                  id="nav-icon"
                  onClick={() => this.setState({ navVisible: true })}
                  className="mobileOnly"
                />}
              <h1>Personal Devoxx</h1>

            </TitleContainer>
            {this.state.uuidPresent &&
              <div>
                <NavButtons />
                <LogoutButton
                  className="desktopOnlyInline"
                  onClick={this.logOut}
                >
                  Log Out
                </LogoutButton>
              </div>}
          </NavBar>
          <PrivateRoute
            path="/"
            exact
            uuidPresent={this.state.uuidPresent}
            render={props => (
              <Dashboard
                speakerData={this.state.speakers}
                talkData={this.state.talks}
                talkIDs={mergeUniqueArrayByID(
                  this.state.favouredTalks,
                  this.state.scheduledTalks
                )}
                recommendations={this.state.globalRecommendations}
                stats={this.state.stats}
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
                  reportStats={this.state.stats}
                  speakerData={this.state.speakers}
                  talkData={this.state.talks}
                  videoSelected={id => {
                    this.setState({ videoID: id });
                    console.log(id);
                  }}
                  talks={mergeUniqueArrayByID(
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

          <Branding />

          {this.state.uuidPresent &&
            <SideNav
              className="mobileOnly"
              showNav={this.state.navVisible}
              onHideNav={() => this.setState({ navVisible: false })}
              title={<div>Personal Devoxx</div>}
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
            />}
          <Notifications />
          {this.state.videoID && <YoutubeVid url={this.state.videoID} />}
        </Page>
      </DevoxxRouter>
    );
  }
}
export default App;
