import React, { Component } from 'react';
import './App.css';
import Home from './Home/component';
import Login from './Login/component';
import SignUp from './SignUp/component';
import { AUTH_TOKEN_LOCAL_STORAGE_KEY } from './constants';
import { sendRequest } from './utilities/request';

const LOGIN_URL = '/auth/token/login/';
const SIGN_UP_URL = '/auth/users/create/';
const GET_CURRENT_USER_URL = '/auth/users/me/';

class App extends Component {
  state = {
    isAuthenticated: false,
    isLoaded: false,
    isSignUp: false
  };
  componentDidMount() {
    this.authenticate();
  }
  goToLogin() {
    this.setState({
      isAuthenticated: false,
      isLoaded: true,
      isSignUp: false
    })
  }
  goToSignUp() {
    this.setState({
      isSignUp: true
    });
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
      this.setState({
        isAuthenticated: true
      });
      localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, auth_token);
    });
  }
  logOut() {
    this.setState({
      isAuthenticated: false
    });
    localStorage.removeItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
  }
  render() {
    if (this.state.isLoaded) {
      if (this.state.isAuthenticated) {
        return (<Home currentUser={this.currentUser} logOut={this.logOut.bind(this)}/>);
      } else {
        if (this.state.isSignUp) {
          return (<SignUp signUp={this.signUp.bind(this)} goToLogin={this.goToLogin.bind(this)}/>);
        } else {
          return (<Login logIn={this.logIn.bind(this)} goToSignUp={this.goToSignUp.bind(this)}/>);
        }
      }
    } else {
      return (<div>Loading...</div>)
    }
  }
}

export default App;
