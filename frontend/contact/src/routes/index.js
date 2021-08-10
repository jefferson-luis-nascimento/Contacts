import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Contact from '~/pages/Contact';
import NaturalPersonRegister from '~/pages/Contact/NaturalPersonRegister';
import LegalPersonRegister from '~/pages/Contact/LegalPersonRegister';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Contact} />
      <Route path="/register-np" exact component={NaturalPersonRegister} />
      <Route path="/edit-np/:id" exact component={NaturalPersonRegister} />
      <Route path="/register-lp" exact component={LegalPersonRegister} />
      <Route path="/edit-lp/:id" exact component={LegalPersonRegister} />
    </Switch>
  );
}
