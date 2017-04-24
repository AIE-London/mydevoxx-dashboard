/**
 * Created by dan on 07/04/2017.
 */
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class NavButtons extends Component {
  render() {

    return <div>
      <Link to="/">
        <FlatButton label="Home"/>
      </Link>
      <Link to="/report">
        <FlatButton label="Report"/>
      </Link>
      <Link to="/top-rated">
        <FlatButton label="Top Rated"/>
      </Link>
    </div>

  }
}

export default NavButtons;