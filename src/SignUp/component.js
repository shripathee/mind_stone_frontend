import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    email: ''
  };
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
  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    let { username, password, email } = this.state;
    this.props.signUp(username, password, email);
  }
  render() {
    return (
      <div className="container form-container">
        <header className="display-4 form-header">
          Sign up
        </header>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div class="form-group">
            <label>
              Email
            </label>
            <input type="email" className="form-control" required value={this.state.email} onChange={this.handleEmailChange.bind(this)}/>
          </div>
          <div class="form-group">
            <label>
              Username              
            </label>
            <input type="text" className="form-control" required value={this.state.username} onChange={this.handleUsernameChange.bind(this)}/>
          </div>
          <div class="form-group">
            <label>
              Password
            </label>
            <input className="form-control" type="password" required value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
          </div>
          <p>
            <input className="btn btn-primary" type="submit" value="Submit" />
          </p>
        </form>
        <p>Already have an account, please <Link to="/log-in">log in</Link></p>
      </div>
    );
  }
}