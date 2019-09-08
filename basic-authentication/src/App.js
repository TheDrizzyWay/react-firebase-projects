import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './components/Landing';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import PasswordForgetPage from './components/PasswordForget';
import HomePage from './components/Home';
import AccountPage from './components/Account';
import AdminPage from './components/Admin';
import { routes } from './constants/routes';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />
      <Switch>
        <Route exact path={routes.LANDING} component={LandingPage} />
        <Route path={routes.SIGN_UP} component={SignUpPage} />
        <Route path={routes.SIGN_IN} component={SignInPage} />
        <Route path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={routes.HOME} component={HomePage} />
        <Route path={routes.ACCOUNT} component={AccountPage} />
        <Route path={routes.ADMIN} component={AdminPage} />
      </Switch>
    </div>
  </Router>
  );

export default App;
