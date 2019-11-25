import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Redirect from 'react-router-dom/es/Redirect';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import ClienteForm from './pages/cliente/ClienteForm';
import { getToken } from './services/auth.service';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {getToken() == null ? <Redirect to="/login" /> : <Home />}
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/cliente/new" component={ClienteForm} />
        <Route path="/cliente/edit/:id" component={ClienteForm} />
        <Route path="/cliente/view/:id" component={ClienteForm} />
      </Switch>
    </BrowserRouter>
  );
}
