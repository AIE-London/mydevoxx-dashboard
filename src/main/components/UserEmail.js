import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import retrieveUuid from "../api/retrieveUuid";
import { Form, Button, Input } from "muicss/react";
import { Row } from "react-flexbox-grid";
import styled from "styled-components";

import Card from "./Card";

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
  flex-direction: row;
  text-align: left;
  padding-bottom: 50px;
  & form {
    width: 100%;
  }
  & button {
    background: transparent;
    right: 0;
    position: absolute;
  }
`;

class UserEmail extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false, value: null };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert("An email was submitted: " + this.state.value);

    retrieveUuid
      .getUUID(this.state.value)
      .then(uuid => {
        if (!uuid || uuid.length === 0) {
          throw new Error("Missing UUID");
        }
        this.props.db.record.add({ id: "0", uuid: uuid });
        this.props.onSignIn().then(() => {
          this.setState({ redirect: true });
        });
      })
      .catch(error => {
        this.setState({ error: error });
      });
    event.preventDefault();
    return false;
  }

  render() {
    return (
      <section>
        <LoginPage center="xs" middle="xs">
          <LoginCard>
            <h3> Please login with your email </h3>
            <Form onSubmit={this.handleSubmit}>
              {this.state.redirect && <Redirect to="/" />}
              <Input
                floatingLabel={true}
                required={true}
                type="email"
                name="email"
                label="Email"
                onChange={event => this.setState({ value: event.target.value })}
              />
              {this.state.error &&
                <p>Error: UUID not found, please try again.</p>}
              <Button type="submit">Submit</Button>
            </Form>
          </LoginCard>
        </LoginPage>
      </section>
    );
  }
}

export default UserEmail;
