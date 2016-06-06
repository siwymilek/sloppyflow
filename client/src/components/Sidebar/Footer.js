import React, { Component } from 'react';
import Avatar from '../../common/Avatar';
import Status from '../../common/Status';

import { logout } from '../../actions/login';
import { redirect } from '../../actions/app';
import Store from '../../store';

export default class Footer extends Component {

    constructor() {
        super();

        this.state = {
            isMenuOpened: false
        }
    }

    handleLogout(e) {
        e.preventDefault();

        Store.dispatch(logout());
        redirect('/login');
    }

    render() {
        return (
            <div className="sidebar--footer">
                <ul className={"footer--menu"+(this.state.isMenuOpened ? '' : ' menu-hidden')}>
                    <li>
                        <a href="#">
                            <Status
                                online
                                size={10}
                            /> <span>Online</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <Status
                                away
                                size={10}
                            /> <span>Away</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <Status
                                busy
                                size={10}
                            /> <span>Busy</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <Status
                                invisible
                                size={10}
                            /> <span>Invisible</span>
                        </a>
                    </li>
                    <li><a href="#"><i className="fa fa-sliders" aria-hidden="true"/> <span>My account</span></a></li>
                    <li><a href="#"><i className="fa fa-wrench" aria-hidden="true"/> <span>Administration</span></a></li>
                    <li><a href="#" onClick={this.handleLogout.bind(this)}><i className="fa fa-sign-out" aria-hidden="true"/> <span>Logout</span></a></li>
                </ul>

                <a href="#" className="profile-toggle" onClick={() => {
                    this.setState({
                        isMenuOpened: !this.state.isMenuOpened
                    });
                }}>
                    <Status
                        away
                        size={10}
                        style={{marginLeft: 20, marginRight: 10}}
                    />
                    <Avatar
                        photo="https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg"
                        size={40}
                        style={{marginRight: 10}}
                    />
                    <h4>siwymilek</h4>
                    <img src="/images/arrow.png" className={"arrow"+(this.state.isMenuOpened ? ' close-arrow' : '')}/>
                </a>
            </div>
        );
    }
}
