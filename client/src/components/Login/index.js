import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from '../../forms/Login';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

import Loader from 'halogen/PulseLoader';

import { redirect } from '../../actions/app';
import { login } from '../../actions/login';

class Login extends Component {

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
        const user = nextProps.user;
        
        if(user.get('data')) {
            redirect();
        }

        const error = user.get('reason');
        if(error) {
            Alert.error('Wrong credentials. Try again.', {
                position: 'top',
                timeout: 'none',
                effect: 'stackslide'
            });
        }
    }

    handleFormSubmit(values) {
        return new Promise((resolve) => {
            this.props.dispatch(login(values.username, values.password));
            resolve();
        });
    }

    renderForm() {
        return (
            <div className="login-wrapper">
                <h2>sloppyflow</h2>

                <div className="form-container">
                    <LoginForm onSubmit={this.handleFormSubmit.bind(this)}/>
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
        user: state.user
    }
})(Login);