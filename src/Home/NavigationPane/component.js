import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavigationList from 'generic-components/NavigationList';
import './styles.css';

class NavigationPane extends Component {
  render() {
    return (
      <div className="nav">
        <header class="lead nav_header">Users</header>
        <NavigationList entity='users' items={this.props.users} labelProperty='username'/>
        <header class="lead nav_header">
          Groups <Link className="small float-right" to="/groups/create/">+</Link>
        </header>
        <NavigationList entity='groups' items={this.props.groups} labelProperty='name'/>
        <footer class="nav_log-out">
          <div class="text-center">@{this.props.currentUser.username}</div>
          <button class="btn btn-dark" onClick={this.props.logOut}>Log out</button>
        </footer>
      </div>
    );
  }
}

export default NavigationPane;