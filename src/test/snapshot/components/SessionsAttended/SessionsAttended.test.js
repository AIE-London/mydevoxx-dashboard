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
        <SessionsAttended  title="Polymer - Web Standards" name="Dan Cotton" />
    ).toJSON();
    expect(tree).toMatchSnapshot();

});
