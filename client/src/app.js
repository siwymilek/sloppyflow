import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import Store from './store';
import { setCurrentChannel } from './actions/app';
import { appInitialized } from './actions/app';

import Layout from './components/Layout';
import Main from './components/Main';
import Channel from './components/Channel';
import About from './components/About';
import Login from './components/Login';

// load react-select dependency manually
import 'react-select/dist/react-select.min.css';

export default class App extends Component {

    componentDidMount() {
        Store.dispatch(appInitialized());
    }

    requireAuth(nextState, replace) {
        if (Meteor.user() === null) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            });
        }
    }

    getCurrentChannel(channelName) {
        Store.dispatch(setCurrentChannel(channelName ? channelName : null));
    }

    render() {
        return (
            <Provider store={Store}>
                <Router history={browserHistory}>
                    <Route path="/" component={Layout} onEnter={(nextState) => this.getCurrentChannel(nextState.params.channelName)} onChange={(state, nextState) => this.getCurrentChannel(nextState.params.channelName)}>
                        <IndexRoute component={Main} onEnter={this.requireAuth}/>
                        <Route path="channel/:channelName" component={Channel}/>
                        <Route path="about" component={About}/>
                    </Route>

                    <Route path="login" component={Login}/>
                </Router>
            </Provider>
        );
    }
}
