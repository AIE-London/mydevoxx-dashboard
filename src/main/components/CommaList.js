/**
 * Created by dan on 04/04/2017.
 */
import styled from 'styled-components';

export const CommaList = styled.ul`
  opacity: 0.6;
  padding: 0;
  margin-top: 0.5em;
  padding-left: 0.5em;
  display: inline;
  list-style: none;
`;

export const CommaListItem = styled.li`
  display: inline-block;
  margin-right: 0.5em;
  &:after {
    content: ", ";
  }
  &:last-child:after {
    content: "";
  }
`;