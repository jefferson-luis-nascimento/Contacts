import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Contact from '~/pages/Contact';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Contact} />
      <Route path="/register" exact component={Contact} />
      <Route path="/deliveries/register/:id" exact component={Contact} />
    </Switch>
  );
}
