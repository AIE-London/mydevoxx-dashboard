# Personal Devoxx Dashboard
[![Build Status](https://travis-ci.org/Capgemini-AIE/mydevoxx-dashboard.svg?branch=master)](https://travis-ci.org/Capgemini-AIE/mydevoxx-dashboard)

This repo contains the source code for the personal Devoxx dashboard, built in react.

It serves as a personal dashboard for attendees of the Devoxx UK conference. Those with an account can see their scheduled talks, recommended talks, twitter mentions and a report for statistics about the conference.

The dashboard utilizes technologies such as React and Node.js.

## Usage
Link to the live website: http://bit.ly/personal-devoxx
To run the dashboard locally, clone this repo and then go through the below pre-requisites.

### Pre-requisites
You will need to setup a local wiremock server. We've provided some sample 'mappings'
in /src/test/integration/api/wiremock/mappings.

Once this is done. Export the REACT_APP_WIREMOCK_SERVER environment variable.

### Running the app

```bash
    npm install
    export REACT_APP_WIREMOCK_SERVER=http://localhost:1234
    # use your wiremock URL
    npm start
```

Then, navigate to localhost:3000 in your favourite internet browser.

## Testing
The app is tested via Jest.
To run these tests clone the repo and run the following command:
```bash
    npm install
    npm test
`````

## Capgemini

Come and work with us!

https://www.uk.capgemini.com/
