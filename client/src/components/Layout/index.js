import React, { Component } from 'react';
import Sidebar from '../Sidebar';

export default class Layout extends Component {

    render() {
        return (
            <div id="app-container">
                <div className="sidebar-wrapper">
                    <Sidebar/>
                </div>

                <div className="content-wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
