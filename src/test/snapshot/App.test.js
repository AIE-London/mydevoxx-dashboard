import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../main/App';
import renderer from 'react-test-renderer';


let reportStatsData =
    {
        "minutes": 455,
        "talks": 10,
        "learning": "JS, Polymer, Java" ,
        "attendees": 435
    };

test('app component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

});


test('app component snapshot', () => {
    const tree = renderer.create(
      <App reportStats={reportStatsData}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});