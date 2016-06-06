import React, { Component } from 'react';
import { whichTransitionEvent } from '../../utils/events';

function opacityTransition(time) {
    time = time/1000;
    return '-webkit-transition: opacity '+time+'s ease-in-out; -moz-transition: opacity '+time+'s ease-in-out; -ms-transition: opacity '+time+'s ease-in-out; -o-transition: opacity 1s ease-in-out; transition: opacity '+time+'s ease-in-out;';
}

const transitionEvent = whichTransitionEvent();

class Modal extends Component {

    constructor(props) {
        super();

        this.state = {
            duration: 300
        };

        this.transitionCallback = this.transitionCallback.bind(this);
        this.listenKeyboard = this.listenKeyboard.bind(this);
    }

    listenKeyboard(e) {
        if(e.code == "Escape") {
            e.preventDefault();
            this.hide();
        }
    }

    componentDidMount() {
        this.refs.modal.setAttribute('style', opacityTransition(this.state.duration));
        transitionEvent && this.refs.modal.addEventListener(transitionEvent, this.transitionCallback);

        window.addEventListener("keydown", this.listenKeyboard);
    }

    componentWillUnmount() {
        transitionEvent && this.refs.modal.removeEventListener(transitionEvent, this.transitionCallback);

        window.removeEventListener("keydown", this.listenKeyboard);
    }

    transitionCallback() {
        if(this.refs.modal.style.opacity == 0) {
            this.refs.modal.style.display = 'none';
            
            this.props.onClosed();

            for(const form of this.refs.modal.querySelectorAll('form')) {
                form.reset();
            }
        }
    }

    show() {
        this.refs.modal.style.display = 'flex';
        setTimeout(() => {
            this.refs.modal.style.opacity = 1;
        });
    }

    hide() {
        this.refs.modal.style.opacity = 0;
    }

    render() {
        return (
            <div className="sf--ui-modal" ref="modal">
                <a href="#" className="modal-esc" onClick={(e) => {
                    e.preventDefault();
                    this.hide();
                }}><span>×</span><br/>esc</a>

                <div className="modal-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Modal;