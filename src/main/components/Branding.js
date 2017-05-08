/**
 * Created by tsadler on 02/05/2017.
 */
import React, { Component } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled(Card)`

  margin-left : 30px;
  margin-right : 45px;
  margin-bottom: 20px;
  flex-direction: column;
`;

const Containererer = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Text = styled.h3`
    padding-right: 30px;
    text-align: center;
`;

class Branding extends Component {
  render() {
    return (
      <Container>
        <Containererer>
          <a href="https://www.uk.capgemini.com/">
            {" "}<img
              style={{
                width: 250,
                height: 150
              }}
              src={require("../../../public/caplogo.svg")}
              alt="Capgemini Logo"
            />
          </a>
          <a href="https://www.capgemini.com/applied-innovation-exchange">
            {" "}<img
              style={{
                width: 300,
                height: 125
              }}
              src={require("../../../public/Aie-logo-nolocation.svg")}
              alt="Capgemini AIE Logo"
            />
          </a>
        </Containererer>
        <a href="http://www.uk.capgemini.com/careers/apply-now">
          {" "}<Text>Come work with us</Text>
        </a>

      </Container>
    );
  }
}

export default Branding;
