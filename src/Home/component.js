import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavigationPane from './NavigationPane/component';
import CreateGroup from 'Home/CreateGroup/component';
import Conversation from 'Home/Conversation/component';
import { sendRequest } from 'utilities/request';
import history from '../history';

class Home extends Component {
  state = {
    isLoaded: false,
    canRedirect: false
  };
  componentDidMount() {
    let getUsers = sendRequest('/users');
    let getGroups = sendRequest('/groups');
    Promise.all([getUsers, getGroups]).then(([users, groups]) => {
      this.users = users;
      this.groups = groups;
      let firstUserId = users[0].id;
      this.setState({
        isLoaded: true
      });
      history.push(`/users/${firstUserId}/conversation`);
    });
  }
  addNewGroup(group) {
    this.groups.push(group);
  }
  render() {
    if (this.state.isLoaded) {
      return (
        <div>
          <NavigationPane currentUser={this.props.currentUser} users={this.users} groups={this.groups} logOut={this.props.logOut}/>
          <div className="content">
            <Switch>
              <Route path="/groups/create" render={() => (
                <CreateGroup availableUsers={this.users} addNewGroup={this.addNewGroup.bind(this)}/>
              )}/>
              <Route exact key={new Date().toISOString()} path="/users/:id/conversation" component={Conversation}/>
              <Route exact key={new Date().toISOString()} path="/groups/:id/conversation" component={Conversation}/>
            </Switch>
          </div>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      )
    }
    
  }
}

export default Home;