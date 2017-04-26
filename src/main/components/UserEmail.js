import React, {Component} from 'react';
//import {FormInput} from 'react-form';
import retrieveUuid from "../api/retrieveUuid";
import Dexie from 'dexie';
import {environment} from 'react-router-component';

class UserEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {value: 'Email'};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        alert('An email was submitted: ' + this.state.value);

        //Define indexeddb instance/version
        const db = new Dexie('uuidDb');
        db.version(1).stores({uuid: 'uuid'});

        //open connection to indexeddb - display error if connection failed
        db.open().catch((error => {
            alert('uuidDb could not be accessed: ' + error);
        }));

        let uuid = retrieveUuid.getUUID(this.state.value);

        db.uuid.add({uuid: uuid});
        uuid = this.props.uuid;

        environment.navigate("/Dashboard");
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Please Enter Your Email Address :
                    <input type="text" value={this.state.value}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

/**
ReactDOM.render(
    <NameForm />,
    document.getElementById('root')
);
*/
export default UserEmail;