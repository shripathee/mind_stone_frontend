import React, { Component } from 'react';

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
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Email:
            <input type="email" required value={this.state.email} onChange={this.handleEmailChange.bind(this)}/>
          </label>
          <label>
            Username:
            <input type="text" required value={this.state.username} onChange={this.handleUsernameChange.bind(this)}/>
          </label>
          <label>
            Password:
            <input type="text" required value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>Already have an account, please <a onClick={this.props.goToLogin}>Log in</a></p>
      </div>
    );
  }
}