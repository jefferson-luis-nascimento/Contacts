import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Contact from '~/pages/Contact';
import Register from '~/pages/Contact/Register';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Contact} />
      <Route path="/register" exact component={Register} />
      <Route path="/deliveries/register/:id" exact component={Register} />
    </Switch>
  );
}
