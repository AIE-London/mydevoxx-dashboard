/**
 * Created by tsadler on 07/04/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import FurtherReading from '../../../../main/components/FurtherReading/';
import renderer from 'react-test-renderer';


test('FurtherReading component', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<FutherReading title="Further Reading" />, div);
    });

});
test('FurtherReading component with title snapshot', () => {

    const tree = renderer.create(
        <FurtherReading  text ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at gravida neque.
        Suspendisse vitae lacus eget tellus facilisis...." />
    ).toJSON();
    expect(tree).toMatchSnapshot();

});

