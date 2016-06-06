import React, { Component } from 'react';

class AutoSuggest extends Component {
    
    constructor(props) {
        super(props);

        this.tabMovingEvent = this.tabMovingEvent.bind(this);
        
        this.state = {
            active: 0,
            lastValue: '',
            hide: false
        }
    }

    suggestions() {
        const suggestions = [
            {
                catcher: '/msg',
                addText: '(or /dm) @user [your message]',
                description: 'Send a DM message to another user'
            },
            {
                catcher: '/apps',
                addText: '[search term]',
                description: 'Search for Sloopy Flow Apps in the App Directory'
            },
            {
                catcher: '/archive',
                addText: null,
                description: 'Archive the current channel'
            },
            {
                catcher: '/away',
                addText: null,
                description: 'Toggle to "away" status'
            },
            {
                catcher: '/call',
                addText: '[help]',
                description: 'Start a call'
            }
        ];

        const _suggestions = [];

        const value = this.props.value.replace('/', '\/');
        for(let i = 0, count = suggestions.length; i < count; i++) {
            if((new RegExp("^"+value)).test(suggestions[i].catcher)) _suggestions.push(suggestions[i]);
        }

        return _suggestions;
    }

    select(index) {
        this.setState({active: index});
        this.setSuggestion(index);
    }

    tabMovingEvent(e) {
        let nextIndex;
        const countSuggestions = this.suggestions().length;
        if(countSuggestions == 0) return;

        if(e.code == "Tab" || e.code == "ArrowDown") {
            e.preventDefault();
            nextIndex = this.state.active+1;

            if(nextIndex >= countSuggestions) nextIndex = 0;
            this.select(nextIndex);
        } else if(e.code == "ArrowUp") {
            e.preventDefault();
            nextIndex = this.state.active-1;

            if(nextIndex < 0) nextIndex = countSuggestions-1;
            this.select(nextIndex);
        }

        if(e.code == "Enter" || e.code == "Escape") {
            e.preventDefault();
            this.escape();
            if(e.code == "Enter") this.setSuggestion();
        } else {
            this.setState({
                hide: false
            });
        }
    }

    setSuggestion(index) {
        index = index == undefined ? this.state.active : index;
        this.props.onChange(this.suggestions()[index].catcher+' ');
    }

    componentDidMount() {
        window.addEventListener("keydown", this.tabMovingEvent);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.tabMovingEvent);
    }

    escape() {
        this.setState({
            lastValue: this.props.value,
            hide: true
        });
    }

    render() {
        const suggestions = this.suggestions();

        if((suggestions.length == 0 || this.props.value.trim().length == 0) || (this.state.hide && this.state.lastValue == this.props.value)) return null;

        return (
            <div className="ui-autosuggest">
                <header>
                    <span className="title">Commands</span>
                    <span className="right"><span>tab</span> or <span>&#8593; &#8595;</span> <span style={{marginLeft: 10, position: 'relative', top: 3}}>&#8629;</span> to select <span style={{marginLeft: 10}}>esc</span> to dismiss</span>
                </header>
                <ul>
                    {suggestions.map((suggestion, i) => {
                        return (
                            <li
                                key={`suggestion-${i}`}
                                className={this.state.active == i ? 'active' : ''} onMouseOver={() => this.select(i)}
                                onClick={() => this.escape()}
                            >
                                <span className="catcher">{suggestion.catcher}</span>
                                <span className="addText">{suggestion.addText}</span>
                                <span className="description">{suggestion.description}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

AutoSuggest.propTypes = {
    active: React.PropTypes.number,
    value: React.PropTypes.string
};

AutoSuggest.defaultProps = {
    active: 0,
    value: ''
};

export default AutoSuggest;