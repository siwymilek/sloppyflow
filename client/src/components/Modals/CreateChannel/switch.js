import React, { Component } from 'react';

class Switch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            on: props.on
        }
    }

    toggleSwitch(e) {
        e.preventDefault();
        this.setState({on: !this.state.on}, () => {
            if(this.props.onChange) this.props.onChange(this.state.on ? 'on' : 'off');
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({on: nextProps.on});
    }

    render() {
        return (
            <a className={'channel--ui-switch '+(this.state.on ? 'on': 'off')} onClick={this.toggleSwitch.bind(this)} style={this.props.style}>
                <span className="text on">Public</span>
                <span className="text off">Private</span>
                
                <span className="channel--ui-switch-slider">
                    <span className="dot"></span>
                </span>
            </a>
        );
    }
}

Switch.propTypes = {
    on: React.PropTypes.bool,
    onChange: React.PropTypes.func
};

Switch.defaultProps = {
    on: false
}

export default Switch;