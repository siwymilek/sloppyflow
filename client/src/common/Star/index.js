import React, { Component } from 'react';

class Star extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: props.active
        }
    }

    toggleState(e) {
        e.preventDefault();

        if(this.props.toggling) {
            this.setState({
                active: !this.state.active
            }, () => {
                if(this.props.onChange != undefined) this.props.onChange(this.state.active)
            });
        }
    }

    render() {
        return (
            <a href={this.props.href != undefined ? this.props.href : '#'} className="sf-ui--star" style={{fontSize: this.props.size, ...this.props.style}} onClick={this.toggleState.bind(this)}>
                <i className={this.state.active ? 'fa fa-star active' : 'fa fa-star-o'} aria-hidden="true"/>
            </a>
        );
    }
}

Star.propTypes = {
    size: React.PropTypes.number,
    active: React.PropTypes.bool,
    toggling: React.PropTypes.bool,
    onChange: React.PropTypes.func
};

Star.defaultProps = {
    size: 22,
    active: false,
    toggling: false
};

export default Star;