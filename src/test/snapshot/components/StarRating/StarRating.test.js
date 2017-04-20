/**
 * Created by dan on 04/04/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import StarRating from '../../../../main/components/StarRating';
import renderer from 'react-test-renderer';

test('StarRating', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StarRating />, div);
  });

});
test('StarRating with rating 0', () => {

  const tree = renderer.create(
    <StarRating rating="0" />
  ).toJSON();
  expect(tree).toMatchSnapshot();

});
test('StarRating with rating 5', () => {

  const tree = renderer.create(
    <StarRating rating="5" />
  ).toJSON();
  expect(tree).toMatchSnapshot();

});
test('StarRating with rating 4', () => {

  const tree = renderer.create(
    <StarRating rating="4" />
  ).toJSON();
  expect(tree).toMatchSnapshot();

});
test('StarRating with rating 3', () => {

  const tree = renderer.create(
    <StarRating rating="3" />
  ).toJSON();
  expect(tree).toMatchSnapshot();

});
test('StarRating with rating 2', () => {

  const tree = renderer.create(
    <StarRating rating="2" />
  ).toJSON();
  expect(tree).toMatchSnapshot();

});
test('StarRating with rating 1', () => {

  const tree = renderer.create(
    <StarRating rating="1" />
  ).toJSON();
  expect(tree).toMatchSnapshot();

});