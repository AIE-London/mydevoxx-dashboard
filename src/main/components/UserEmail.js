/**
 * Created by SCMORETO on 19/04/2017.
 */

import React, {Component} from 'react';
import {FormInput} from 'react-form'
import Select from 'react-select'
import UUID from "/../api/retrieveUuid";
import retrieveUuid from "../api/retrieveUuid"

class UserEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {value: 'Email'};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //     handleChange(event) {
    //     this.setState({value: event.target.value});
    // }

    handleSubmit(event) {
        alert('An email was submitted: ' + this.state.value);
        return retrieveUuid(this.state.value);
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
