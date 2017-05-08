/**
 * Created by tsadler on 02/05/2017.
 */
import React, { Component } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled(Card)`
  display: flex; 
  flex-direction: row;
  margin-left : 30px;
  margin-right : 45px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
`;

class Branding extends Component {
  render() {
    return (
      <Container>

        <img
          style={{
            width: 250,
            height: 150
          }}
          src={require("../../../public/caplogo.svg")}
          alt="Capgemini Logo"
        />

        <img
          style={{
            width: 300,
            height: 125
          }}
          src={require("../../../public/Aie-logo-nolocation.svg")}
          alt="Capgemini AIE Logo"
        />

        <input
          type="button"
          value="button name"
          href="https://www.uk.capgemini.com/careers/apply-now"
          onClick="window.open(this.href); return false;"
          onkeypress="window.open(this.href); return false;"
        />
      </Container>
    );
  }
}

export default Branding;
