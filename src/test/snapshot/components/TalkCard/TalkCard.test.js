import React from 'react';
import ReactDOM from 'react-dom';
import TalkCard from '../../../../main/components/TalkCard';
import renderer from 'react-test-renderer';
import testImage from '../../images/test-image.jpeg';

const talkData = {
    title: 'Welcome to Devoxx',
    description: 'Join the organisers of Devoxx UK and great keynote ' +
    'speakers for inspring stories in 20 minutes.',
    rating: 3,
    topTracks: [
        'Devoxx',
        'SpringBoot',
    ],
    notes: 'Lorem ipsum dolor sit amet, everti quaestio mel ea. Ex eos ' +
    'volutpat qualisque. Sale tantas cotidieque quo ut, ad nostro consectetuer' +
    ' nec. Feugiat qualisque quo an. Labores officii.',
    review: {
        name: 'Test User 123',
        comment: '123 Great session, thanks for organising. Looking forward to the next one!',
        image: testImage
    }

};

test('card component', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TalkCard title="Welcome to Devoxx"/>, div);
    });

});

test('card component with title snapshot', () => {

    const tree = renderer.create(
        <TalkCard talk={talkData}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();

});