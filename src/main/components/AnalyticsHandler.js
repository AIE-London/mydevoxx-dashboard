/**
 * Created by dan on 18/05/2017.
 */
import React from "react";
import ReactGA from "react-ga";
import { withRouter } from "react-router-dom";

import debugLog from "../utils/debugLog";

class ScrollToTop extends React.Component {
  constructor() {
    super();
    if (["production", "integration"].indexOf(process.env.NODE_ENV) >= 0) {
      debugLog.log("[Analytics] Initialising");
      ReactGA.initialize("UA-98791923-1");
      debugLog.log("[Analytics] Initialised");
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
    if (["production", "integration"].indexOf(process.env.NODE_ENV) >= 0) {
      debugLog.log("[Analytics] Logging pageview");
      ReactGA.set({ page: window.location.pathname });
      debugLog.log("[Analytics] Set page");
      ReactGA.pageview(window.location.pathname);
      debugLog.log("[Analytics] Logged pageview");
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
