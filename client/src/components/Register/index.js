import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegisterForm from '../../forms/Register';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

import Loader from 'halogen/PulseLoader';

import { redirect } from '../../actions/app';
import { register } from '../../actions/login';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: null
        }
    }

    componentDidMount() {
        this.setState({
            content: <Loader color="#ffffff" size="16px" />
        }, () => {
            setTimeout(() => {
                this.setState({content: this.renderForm()}, () => {
                    setTimeout(() => {
                        document.getElementsByClassName('login-wrapper')[0].style.opacity = 1;
                    }, 100);
                });
            }, 1000);
        });
    }

    componentWillReceiveProps(nextProps) {
        const register = nextProps.register;
        const error = register.get('reason');

        console.log(nextProps);
        if(error) {
            Alert.error(error, {
                position: 'top',
                timeout: 'none',
                effect: 'stackslide'
            });
        } else {
            Alert.success('Login success. You can log in.', {
                position: 'top',
                timeout: 'none',
                effect: 'stackslide'
            });

            redirect();
        }
    }

    handleFormSubmit(values) {
        return new Promise((resolve) => {
            this.props.dispatch(register(values.username, values.password));
            resolve();
        });
    }

    renderForm() {
        return (
            <div className="login-wrapper">
                <h2>sloppyflow</h2>

                <div className="form-container">
                    <RegisterForm onSubmit={this.handleFormSubmit.bind(this)}/>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div id="login-container">
                {this.state.content}
                <Alert stack={{limit: 1}} />
            </div>
        );
    }
}

export default connect((state, ownProps) => {
    return {
        register: state.register
    }
})(Register);