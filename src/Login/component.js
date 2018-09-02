import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    username: '',
    password: ''
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
  handleSubmit(event) {
    event.preventDefault();
    let { username, password } = this.state;
    this.props.logIn(username, password);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
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
        <button onClick={this.props.goToSignUp}>Sign Up</button>
      </div>
    );
  }
}