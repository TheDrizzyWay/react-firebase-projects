import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withFirebase } from './components/Firebase';
import Navigation from './components/Navigation';
import LandingPage from './components/Landing';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import PasswordForgetPage from './components/PasswordForget';
import HomePage from './components/Home';
import AccountPage from './components/Account';
import AdminPage from './components/Admin';
import { routes } from './constants/routes';
import { toggleAuth } from './actions';

const App = ({ firebase, toggleAuth, auth }) => {
  useEffect(() => {
    firebase.auth.onAuthStateChanged(authUser => {
      toggleAuth(authUser);
    });
  }, [firebase.auth, toggleAuth]);

  return (
  <Router>
    <div>
      <Navigation auth={auth} />
      <hr />
      <Switch>
        // Todo: create a higher order component that checks auth value from store and passes auth props to routes
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
};

const mapStateToProps = state => ({
   auth: state.auth.authUser
});

export default connect(mapStateToProps, { toggleAuth })(withFirebase(App));
