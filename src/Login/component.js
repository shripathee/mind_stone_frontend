import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  state = {
    username: '',
    password: ''
  };
  componentDidMount() {
    localStorage.clear();
  }
  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }
  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    let { username, password } = this.state;
    this.props.logIn(username, password);
  }
  render() {
    return (
      <div className="container form-container">
        <header className="display-4 form-header">
          Sign in
        </header>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div class="form-group">
            <label>
              Username
            </label>
            <input className="form-control" type="text" required value={this.state.username} onChange={this.handleUsernameChange.bind(this)}/>
          </div>
          <div class="form-group">
            <label>
              Password
            </label>
            <input className="form-control" type="password" required value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
          </div>
          <input className="btn btn-primary" type="submit" value="Submit" /> or <Link to="/sign-up">sign up</Link> to create a new account.
        </form>
      </div>
    );
  }
}