import React, { Component } from 'react';

class Avatar extends Component {

    render() {
        return (
            <div className="sf-ui--avatar" style={{width: this.props.size, height: this.props.size, borderRadius: this.props.size*this.props.radiusRatio, ...this.props.style}}>
                <img src={this.props.photo} alt="avatar" style={{maxWidth: this.props.size, maxHeight: this.props.size}}/>
            </div>
        );
    }
}

Avatar.propTypes = {
    photo: React.PropTypes.string.isRequired,
    size: React.PropTypes.number,
    radiusRatio: React.PropTypes.number
};

Avatar.defaultProps = {
    size: 100,
    radiusRatio: 0.5
};

export default Avatar;