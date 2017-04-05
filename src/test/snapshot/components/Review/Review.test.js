/**
 * Created by dan on 05/04/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Review from '../../../../main/components/Review';
import renderer from 'react-test-renderer';
import testImage from '../../images/test-image.jpeg';

const fullyPopReview = {
  name: 'Test User',
  comment: 'Great session, thanks for organising. Looking forward to the next one!',
  image: testImage
};

const emptyReview = {

};

const reviewWithoutImage = {
  name: 'Test User 3',
  comment: '3 Great session, thanks for organising. Looking forward to the next one!'
};

test('Review Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Review />, div);
  });
});

test('Review Component - Fully populated review', () => {
  const tree = renderer.create(
    <Review review={fullyPopReview} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Review Component - Empty Review', () => {
  const tree = renderer.create(
    <Review review={emptyReview} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Review Component - Missing Image', () => {
  const tree = renderer.create(
    <Review review={reviewWithoutImage} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});