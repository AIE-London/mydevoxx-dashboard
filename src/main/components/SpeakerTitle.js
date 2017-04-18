/**
 * Created by DLINDSAY on 04-Apr-17.
 */
import React from 'react';

class SpeakerTitle extends React.Component{


    render() {
      return <div>
          <h3>{this.props.name}</h3>
          <p>{this.props.company}</p>
      </div>
  }
};
export default SpeakerTitle;