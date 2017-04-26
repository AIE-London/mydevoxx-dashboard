import React, {Component} from 'react';
import retrieveUuid from "../api/retrieveUuid";

class UserEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {value: null};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        alert('An email was submitted: ' + this.state.value);

        retrieveUuid.getUUID(this.state.value).then(uuid => {
            this.props.db.record.add({id: '0', uuid: uuid});
        });
        event.preventDefault();
        return false;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Please Enter Your Email Address :
                    <input type="text" name="email" placeholder="Email" onChange={event => this.setState({ value: event.target.value })}/>
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