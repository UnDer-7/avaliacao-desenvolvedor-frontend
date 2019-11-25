import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login/Login';
import Home from './pages/home/Home';
import ClienteForm from './pages/cliente/ClienteForm';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/cliente/new" component={ClienteForm} />
        <Route path="/cliente/:id" component={ClienteForm} />
      </Switch>
    </BrowserRouter>
  );
}
