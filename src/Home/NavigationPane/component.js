import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavigationList from 'generic-components/NavigationList';

class NavigationPane extends Component {
  renderUserList() {

  }
  render() {
    return (
      <div className="nav">
        <button onClick={this.props.logOut}>Log out</button>
        <h4>Users</h4>
        <NavigationList entity='users' items={this.props.users} labelProperty='username'/>
        <h4>Groups</h4>
        <NavigationList entity='groups' items={this.props.groups} labelProperty='name'/>
        <Link to="/groups/create/">Create Group</Link>
      </div>
    );
  }
}

export default NavigationPane;