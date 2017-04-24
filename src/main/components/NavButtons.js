import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const LinkText = styled.li`
  font-family: Helvetica;
  font-weight: 500;
  display: inline-block;
  font-size: 1.5em;
  &:after {
    content: " - ";
  }
  &:last-child:after {
    content: "";
  }
`;

export const InlineList = styled.ul`
  opacity: 0.6;
  padding: 0;
  margin-top: 0.5px;
  padding-left: 0.5em;
  display: inline;
  list-style: none;
`;

class NavButtons extends Component {
    render() {

        return <InlineList>
            <LinkText>
                <Link to="/">
                    Home
                </Link>
            </LinkText>
            <LinkText>
                <Link to="/report">
                    Report
                </Link>
            </LinkText>
            <LinkText>
                <Link to="/top-rated">
                    Top Rated
                </Link>
            </LinkText>
        </InlineList>

    }
}

export default NavButtons;