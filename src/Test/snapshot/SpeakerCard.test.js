/**
 * Created by DLINDSAY on 05-Apr-17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Speaker from '../../main/components/SpeakerCard';
import renderer from 'react-test-renderer';

test('app component', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Speaker name="Testy MacTest" company="Testy Inc." blog="forsomereasonihaveablog.com"
                             talks={["The Importance of Jazz in modern society","Rory's Roaring Apps: An M.Night Shayamalan production","That other talk"]}/>,
                        div);
    });

});

test('reportStats component with title snapshot', () => {
    const tree = renderer.create(
        <Speaker  name="Testy" company="Testy Inc." blog="blogname.com" talks={["Talk 1 is One", "Talk 2 is Two", "Talk 3 is Three"]} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});