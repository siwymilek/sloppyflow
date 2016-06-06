import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import './startup/accounts-config';
import App from './src/app.js';

Meteor.startup(() => {
  Tracker.autorun(() => {
    // console.log(Meteor.status().status);
  });

  render(<App />, document.getElementById('render-target'));
});