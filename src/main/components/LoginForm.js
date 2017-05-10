import React, { Component } from "react";
import { notify } from "react-notify-toast";
import { Row } from "react-flexbox-grid";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import * as firebase from "firebase";

/*
  Import components
 */
import Card from "./Card";

/*
  Import util functions
 */
import debugLog from "../utils/debugLog";

/*
  Import API integration pieces
 */
import retrieveUuid from "../api/retrieveUuid";

/*
  Define Endpoints
 */
let successURL = "https://personal.devoxx.co.uk";
const mockSuccessURL = "http://localhost:3000/report";

if (["production", "integration"].indexOf(process.env.NODE_ENV) < 0) {
  successURL = mockSuccessURL;
}

/*
  Define Login Specific styled-components
 */
const LoginPage = styled(Row)`
  height: 100%;
  width: 100%;
  flex: 1;
`;

const LoginCard = styled(Card)`
  margin-top: 2em;
  padding: 2em;
  width: 90%;
  max-width: 400px;
  padding-top: 1em;
  padding-bottom: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-bottom: 50px;
  & form {
    width: 100%;
  }
  margin-bottom: 4em;
`;

class LoginForm extends Component {
  uiConfig = {
    signInSuccessUrl: successURL,
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: "https://personal-devoxx.eu-gb.mybluemix.net/login"
  };

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      value: null,
      loading: false,
      loginError: false
    };
    this.goFetchUUID = this.goFetchUUID.bind(this);
    this.logIn = this.logIn.bind(this);
    this.registerListeners = this.registerListeners.bind(this);
    // Register firebase state change listeners
    this.registerListeners();
  }

  logIn() {
    // Start firebase in container provided;
    this.props.fbui.start("#firebaseui-auth-container", this.uiConfig);
  }

  goFetchUUID(email) {
    // Set loading to true in state
    this.setState({ loading: true });
    // Go get our UUID
    return (
      retrieveUuid
        .getUUID(email)
        // Then - take that UUID and check it's not null
        .then(uuid => {
          if (!uuid || uuid.length === 0) {
            // It's a bad UUID - so throw an error
            this.setState({ loading: false });
            throw new Error("Missing UUID");
          }
          // We're ok - so just return the promise that we get
          // from the function that will store the UUID
          return this.props.storeUUID(uuid);
        })
        // Once we've stored the UUID - call the signin callback
        .then(this.props.onSignIn)
        // Once we've done that. Redirect to the home page.
        .then(() => {
          this.setState({ redirect: true, loading: false });
        })
    );
  }

  registerListeners() {
    // Call our function if the state of the user's authentication changes.
    this.props.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in - grab their email
        let email = user.email;
        // Go grab the users UUID with that email...
        this.goFetchUUID(email).catch(error => {
          // We got an error - log it if in dev
          debugLog.log(error.message);
          // Show notification to the user explaining the failed UUID request
          notify.show(
            "Login failed, please check you have a MyDevoxx account.",
            "error"
          );
        });
      } else {
        // User signed out - notify them
        notify.show("Signed out");
      }
    }, function(error) {
      // If Firebase login failed - notify user.
      notify.show("Login failed, please try again.", "error");
      debugLog.log(error);
    });
  }

  componentDidMount() {
    try {
      // Create firebase login
      this.logIn();
    } catch (error) {
      // Failed creating firebase login - set state to reflect
      this.setState({ loginError: true });
    }
  }
  render() {
    return (
      <section>
        {this.state.redirect && <Redirect to="/" />}
        <LoginPage center="xs" middle="xs">
          <LoginCard>
            <h3> Please login to Personal Devoxx </h3>
            {this.state.loginError &&
              <p>Error loading login, please try again later.</p>}
            <div id="firebaseui-auth-container" />
          </LoginCard>
        </LoginPage>
      </section>
    );
  }
}

export default LoginForm;
