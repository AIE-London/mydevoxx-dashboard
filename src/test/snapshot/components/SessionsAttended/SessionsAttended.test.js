/**
 * Created by tsadler on 07/04/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import SessionsAttended from '../../../../main/components/SessionsAttended/';
import renderer from 'react-test-renderer';

test('sessionsAttended component', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SessionsAttended title="Welcome to Devoxx" />, div);
    });
});

test('sessionsAttended component with title snapshot', () => {

    const tree = renderer.create(
        <SessionsAttended mainHeader="MySessions" title="Polymer - Web Standards"
                          cardContent ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget libero mi. Ut vulputate leo in velit porta sollicitudin. Pellentesque vitae felis maximus, gravida mauris sed, bibendum turpis."
                          subHeader="Speaker:" name="Dan Cotton" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
