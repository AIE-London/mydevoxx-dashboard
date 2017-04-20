import React from 'react';
import ReactDOM from 'react-dom';
import SessionView from '../../../../main/components/SessionView';
import renderer from 'react-test-renderer';

import testImage from '../../images/test-image.jpeg';

const talkData = {
    dayNo: 'One',
    sTime: '10:00',
    room: 'Mezzanine',
    title: 'Welcome to Devoxx 2017',
    description: 'Join the organisers of Devoxx UK and great keynote ' +
    'speakers for inspring stories in 20 minute segments.',
    rating: 4,
    topTracks: [
        'Java',
        'Devoxx',
        'Spring',
    ],
    notes: 'Lorem ipsum dolor sit amet, everti quaestio mel ea. Ex eos ' +
    'volutpat qualisque. Sale tantas cotidieque quo ut, ad nostro consectetuer' +
    ' nec. Feugiat qualisque quo an. Labores officiis te nam.',
    review: {
        name: 'Test User',
        comment: 'Great session, thanks for organising. Looking forward to the next one!',
        image: testImage
    },
    speakers: [
        {
            name: 'Test Speaker',
            company: 'Capgemini',
            blog: 'personalblog.com',
            talks: [
                'Intro to Devoxx (Room 1 - 11:45)',
                'Intro to Devoxx 2 (Room 2 - 13:45)'
            ]
        }
    ]
};

test('app component', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SessionView talk={talkData}/>,
            div);
    });

});

test('card component with title snapshot', () => {

  const tree = renderer.create(
    <SessionView talk={talkData} />
  ).toJSON();
  expect(tree).toMatchSnapshot();

});