import React, { Component } from 'react';
import './App.css';
import Home from './Home/component';
import Login from './Login/component';
import SignUp from './SignUp/component';
import { AUTH_TOKEN_LOCAL_STORAGE_KEY } from './constants';
import { sendRequest } from './utilities/request';
import history from './history';
import { Redirect, Switch, Route } from 'react-router-dom';

const LOGIN_URL = '/auth/token/login/';
const SIGN_UP_URL = '/auth/users/create/';
const GET_CURRENT_USER_URL = '/auth/users/me/';

class App extends Component {
  state = {
    isAuthenticated: false,
    isLoaded: false
  };
  componentDidMount() {
    this.authenticate();
  }
  goToLogin() {
    this.setState({
      isAuthenticated: false,
      isLoaded: true
    });
    history.push('/log-in');
  }
  authenticate() {
    let token = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
    if (token) {
      sendRequest(GET_CURRENT_USER_URL).then((user) => {
        this.currentUser = user;
        this.setState({
          isAuthenticated: true,
          isLoaded: true
        })
      }).catch(() => {
        this.goToLogin();
      });
    } else {
      this.goToLogin();
    }
  }
  signUp(username, password, email) {
    sendRequest(SIGN_UP_URL, 'POST', {
      username,
      password,
      email
    }).then(() => {
      this.goToLogin();
    });
  }
  logIn(username, password) {
    sendRequest(LOGIN_URL, 'POST', {
      username,
      password
    }).then(({ auth_token }) => {
      localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, auth_token);
      this.authenticate();
    });
  }
  logOut() {
    this.setState({
      isAuthenticated: false
    });
    localStorage.clear();
  }
  render() {
    if (this.state.isLoaded) {
      if (this.state.isAuthenticated) {
        return (<Home currentUser={this.currentUser} logOut={this.logOut.bind(this)}/>);
      } else {
        return (
          <div>
            <Redirect to="/log-in"/>
            <Switch>
              <Route path="/log-in" render={() => (
                <Login logIn={this.logIn.bind(this)}/>
              )}/>
              <Route path="/sign-up" render={() => (
                <SignUp signUp={this.signUp.bind(this)}/>
              )}/>
            </Switch>
          </div>
        )
      }
    } else {
      return (<div>Loading...</div>)
    }
  }
}

export default App;
