import React, {Component} from 'react';
import {FormInput} from 'react-form'
import retrieveUuid from "../api/retrieveUuid"

class UserEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {value: 'Email'};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        alert('An email was submitted: ' + this.state.value);
        return retrieveUuid.getUUID(this.state.value);
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

ReactDOM.render(
    <NameForm />,
    document.getElementById('root')
);

export default UserEmail;