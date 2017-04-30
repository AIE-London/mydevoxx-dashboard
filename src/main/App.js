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

import Dashboard from "./components/Dashboard";
import Report from "./components/Report";
import Talk from "./components/Talk";
import TopRated from "./components/TopRated";
import UserEmail from "./components/UserEmail";
import Dexie from "dexie";

import NavButtons, { NavItems } from "./components/NavButtons";

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
  height: 100%;
`;

class App extends Component {
  constructor() {
    super();
    this.state = { uuidPresent: true, navVisible: false };
    //Define indexeddb instance/version
    db = new Dexie("devoxx-db");
    db.version(1).stores({ record: "id,uuid" });

    //open connection to indexeddb - display error if connection failed
    db.open().catch(error => {
      alert("uuidDb could not be accessed: " + error);
    });

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

  signInPage() {
    return <UserEmail onSignIn={this.uuidExists} db={db} />;
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
            component={Dashboard}
          />
          <Route path="/login" render={this.signInPage} />
          <PrivateRoute
            uuidPresent={this.state.uuidPresent}
            path="/report"
            render={props => {
              return <Report reportStats={reportStatsData} talk={talkDetail} />;
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
