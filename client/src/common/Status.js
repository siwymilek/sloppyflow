import React, { Component } from 'react';

class Status extends Component {

    list() {
        return {
            online: 'rgba(45, 150, 43, 1)',
            away: 'rgba(231, 180, 47, 1)',
            busy: 'rgba(183, 21, 18, 1)',
            invisible: 'rgba(105, 105, 105, 1)',
        }
    }
    
    getColor() {
        const colors = this.list();
        if(this.props.online != undefined) return colors['online'];
        if(this.props.away != undefined) return colors['away'];
        if(this.props.busy != undefined) return colors['busy'];
        return colors['invisible'];
    }

    render() {
        
        return (
            <span style={{display: 'inline-block', width: this.props.size, height: this.props.size, borderRadius: this.props.size/2, backgroundColor: this.getColor(), ...this.props.style}}/>
        );
    }
}

Status.propTypes = {
    size: React.PropTypes.number
};

Status.defaultProps = {
    size: 16
};

export default Status;