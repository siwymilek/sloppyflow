import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import { Link } from 'react-router';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

class Register extends Component {
    render() {
        const {fields: {username, password}, handleSubmit} = this.props;
        
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup
                    controlId="usernameInput"
                >
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="eg. John.Doe"
                        {...username}
                    />
                    <FormControl.Feedback />
                </FormGroup>


                <FormGroup
                    controlId="passwordInput"
                >
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        placeholder="*********"
                        {...password}
                    />
                    <FormControl.Feedback />
                </FormGroup>

                <Button type="submit" bsStyle="info">
                    Register
                </Button>

                <span style={{marginLeft: 20, color: '#eeeeee'}}>|</span>
                <Link to="login">
                    <Button type="button" bsStyle="link">get back to login</Button>
                </Link>
            </form>
        );
    }
}

Register = reduxForm({
    form: 'register',
    fields: ['username', 'password'],
})(Register);

export default Register;
