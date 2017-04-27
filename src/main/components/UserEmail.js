import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import retrieveUuid from "../api/retrieveUuid";

class UserEmail extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false, value: null };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert("An email was submitted: " + this.state.value);

    retrieveUuid.getUUID(this.state.value).then(uuid => {
      if (!uuid || uuid.length === 0) {
        throw new Error("Missing UUID");
      }
      this.props.db.record.add({ id: "0", uuid: uuid });
      this.props.onSignIn().then(() => {
        this.setState({ redirect: true });
      });
    });
    event.preventDefault();
    return false;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.redirect && <Redirect to="/" />}
        <label>
          Please Enter Your Email Address :
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={event => this.setState({ value: event.target.value })}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default UserEmail;
