import React from 'react';

export const UserSelectOption = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        className: React.PropTypes.string,
        isDisabled: React.PropTypes.bool,
        isFocused: React.PropTypes.bool,
        isSelected: React.PropTypes.bool,
        onFocus: React.PropTypes.func,
        onSelect: React.PropTypes.func,
        option: React.PropTypes.object.isRequired,
    },
    handleMouseDown (event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSelect(this.props.option, event);
    },
    handleMouseEnter (event) {
        this.props.onFocus(this.props.option, event);
    },
    handleMouseMove (event) {
        if (this.props.isFocused) return;
        this.props.onFocus(this.props.option, event);
    },
    render () {
        return (
            <div className={this.props.className}
                 onMouseDown={this.handleMouseDown}
                 onMouseEnter={this.handleMouseEnter}
                 onMouseMove={this.handleMouseMove}
                 title={this.props.option.username}>
                <img src={this.props.option.avatar} style={{width: 20, marginRight: 5}}/>
                {this.props.children}
            </div>
        );
    }
});

export const UserSelectValue = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.object
    },
    render () {
        return (
            <div className="Select-value" title={this.props.value.username}>
				<span className="Select-value-label">
                    <img src={this.props.value.avatar} style={{width: 13, position: 'relative', top: -1, marginRight: 6}}/>
                    {this.props.children}
				</span>
            </div>
        );
    }
});