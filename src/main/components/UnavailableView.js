/**
 * Created by dan on 10/05/2017.
 */
import React from "react";
import styled from "styled-components";

export default class UnavailableView extends React.Component {
  render() {
    let colour = this.props.textColor || "#000";

    let Message = styled.h4`
      color: ${colour};
      width: 100%;
      text-align: center;
    `;

    return this.props.children && this.props.children.length > 0
      ? <div>{this.props.children}</div>
      : <Message>No {this.props.itemName} available</Message>;
  }
}
