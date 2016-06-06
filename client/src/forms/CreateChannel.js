import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import Select from 'react-select';
import Switch from '../components/Modals/CreateChannel/switch';

import Store from '../store';
import { fetchUsers } from '../actions/users';

import { UserSelectOption, UserSelectValue } from '../common/SelectUser';

let subscribeStore = () => null;

const defaultNameValidationText = 'Please use lowercase characters (a maximum of 21) and no spaces or periods.';
const validate = values => {
    const errors = {};
    const namePattern = new RegExp('^[0-9a-zA-Z-_.]+$');

    if (values.name != undefined && (values.name.length == 0 || values.name.length > 21 || !namePattern.test(values.name))) {
        errors.name = defaultNameValidationText;
    }

    return errors;
}

const asyncValidate = (values) => {
    return new Promise((resolve, reject) => {
        Meteor.call('checkChannelName', values.name, (error, isExist) => {
            if(isExist) {
                reject({name: 'Channel name exist'});
            } else {
                resolve();
            }
        });
    })
}

class CreateChannel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        subscribeStore = Store.subscribe(() => {
            const state = Store.getState();
            const users = [];

            state.users.get('list').map((user) => {
                users.push(user);
            });

            if(users.toString() !== this.state.users.toString()) {
                this.setState({users});
            }
        });

        Store.dispatch(fetchUsers());
    }

    componentWillUnmount() {
        subscribeStore();
    }

    render() {
        const placeholder = <span>Select participants</span>;
        const {fields: {isPrivate, name, username}, handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <FormGroup
                    controlId="usernameInput"
                    bsSize="large"
                    validationState={name.error ? 'error' : null}
                >

                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                        <Switch
                            on={!isPrivate.value}
                            onChange={(state) => {
                                state = state == 'off' ? true : false;
                                isPrivate.onChange(state);
                            }}
                        />
                        <p style={{margin: 0, marginLeft: 20}}>{isPrivate.value ? 'Restricted to invited members' : 'Anyone on your team can join'}</p>
                    </div>

                    {this.state.isPrivate ? (<p className="_info">A private channel is only visible to its members, and only members of private channel can read or search its contents.</p>) : null}

                    <ControlLabel>Channel name</ControlLabel>
                    <InputGroup>
                        <InputGroup.Addon><i className={'fa '+(this.state.isPrivate ? 'fa-lock' : 'fa-hashtag')} aria-hidden="true"/></InputGroup.Addon>
                        <FormControl
                            type="text"
                            placeholder="eg. team-operations"
                            {...name}
                        />
                    </InputGroup>
                    {<HelpBlock>{(name.touched && name.error) ? name.error : defaultNameValidationText}</HelpBlock>}
                    <FormControl.Feedback />
                </FormGroup>

                <FormGroup
                    controlId="passwordInput"
                    bsSize="large"
                >
                    <ControlLabel>Participants <span>(optional)</span></ControlLabel>
                    <Select
                        onChange={(participants) => {
                            username.onChange(participants)
                        }}
                        optionComponent={UserSelectOption}
                        options={this.state.users}
                        placeholder={placeholder}
                        value={username.value}
                        valueComponent={UserSelectValue}
                        multi={true}
                        labelKey="username"
                        valueKey="username"
                        clearable={true}
                    />
                    <FormControl.Feedback />
                </FormGroup>

                <Button type="submit" bsStyle="info" bsSize="large" >
                    Create channel
                </Button>
            </form>

        );
    }
}

CreateChannel = reduxForm({
    form: 'channel',
    fields: ['isPrivate', 'name', 'username', 'type'],
    asyncValidate,
    asyncBlurFields: ['name'],
    validate
},
state => ({
    initialValues: {
        isPrivate: false,
        name: '',
        username: [],
        type: 'channel'
    }
})
)(CreateChannel);

export default CreateChannel;
