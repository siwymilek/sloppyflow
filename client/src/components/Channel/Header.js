import React, { Component } from 'react';
import Star from '../../common/Star';

export default class Header extends Component {

    render() {
        return (
            <header className="fixed-title">
                <Star active={true}
                      style={{marginRight: 5}}
                      toggling={true}
                      onChange={(state) => console.log(state)}
                />

                <h2><i className="fa fa-hashtag" aria-hidden="true"/> Random</h2>

                <ul className="tabs">
                    <li className="active"><a href="#">Chat</a></li>
                    <li><a href="#">Calendar</a></li>
                    <li><a href="#">Tasks</a></li>
                </ul>
            </header>
        );
    }
}
